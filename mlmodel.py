# MandiMitra ML Price Prediction System
# Language: Python 3.8+
# Libraries: scikit-learn, pandas, numpy, joblib

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import datetime
from typing import Dict, List, Tuple
import warnings
warnings.filterwarnings('ignore')

class CropPricePredictionModel:
    """
    ML Model for predicting crop prices using multiple algorithms:
    1. Random Forest Regressor - Primary model
    2. Gradient Boosting Regressor - Secondary model  
    3. Linear Regression - Baseline model
    """
    
    def __init__(self):
        # Initialize models
        self.rf_model = RandomForestRegressor(
            n_estimators=100,
            max_depth=15,
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42
        )
        
        self.gb_model = GradientBoostingRegressor(
            n_estimators=100,
            learning_rate=0.1,
            max_depth=6,
            random_state=42
        )
        
        self.linear_model = LinearRegression()
        
        # Preprocessing tools
        self.scaler = StandardScaler()
        self.label_encoders = {}
        self.feature_names = []
        self.is_trained = False
        
    def prepare_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Feature engineering for crop price prediction
        """
        # Create time-based features
        df['year'] = pd.to_datetime(df['date']).dt.year
        df['month'] = pd.to_datetime(df['date']).dt.month
        df['day_of_year'] = pd.to_datetime(df['date']).dt.dayofyear
        df['quarter'] = pd.to_datetime(df['date']).dt.quarter
        
        # Price-based features
        df['price_lag_1'] = df.groupby(['crop', 'state'])['price'].shift(1)
        df['price_lag_7'] = df.groupby(['crop', 'state'])['price'].shift(7)
        df['price_lag_30'] = df.groupby(['crop', 'state'])['price'].shift(30)
        
        # Moving averages
        df['price_ma_7'] = df.groupby(['crop', 'state'])['price'].rolling(window=7).mean().reset_index(0, drop=True)
        df['price_ma_30'] = df.groupby(['crop', 'state'])['price'].rolling(window=30).mean().reset_index(0, drop=True)
        
        # Volatility features
        df['price_volatility_7'] = df.groupby(['crop', 'state'])['price'].rolling(window=7).std().reset_index(0, drop=True)
        df['price_volatility_30'] = df.groupby(['crop', 'state'])['price'].rolling(window=30).std().reset_index(0, drop=True)
        
        # Seasonal trends
        df['seasonal_avg'] = df.groupby(['crop', 'month'])['price'].transform('mean')
        df['price_vs_seasonal'] = df['price'] / df['seasonal_avg']
        
        # Market demand indicators
        df['supply_demand_ratio'] = df['quantity'] / df.groupby(['crop', 'date'])['quantity'].transform('sum')
        
        return df
        
    def encode_categorical_features(self, df: pd.DataFrame, fit: bool = True) -> pd.DataFrame:
        """
        Encode categorical variables
        """
        categorical_cols = ['crop', 'state', 'district', 'market']
        
        for col in categorical_cols:
            if col in df.columns:
                if fit:
                    if col not in self.label_encoders:
                        self.label_encoders[col] = LabelEncoder()
                    df[f'{col}_encoded'] = self.label_encoders[col].fit_transform(df[col].astype(str))
                else:
                    if col in self.label_encoders:
                        # Handle unseen categories
                        df[f'{col}_encoded'] = df[col].apply(
                            lambda x: self.label_encoders[col].transform([str(x)])[0] 
                            if str(x) in self.label_encoders[col].classes_ else -1
                        )
        
        return df
    
    def preprocess_data(self, df: pd.DataFrame, fit: bool = True) -> Tuple[np.ndarray, np.ndarray]:
        """
        Complete data preprocessing pipeline
        """
        # Feature engineering
        df = self.prepare_features(df)
        
        # Encode categorical variables
        df = self.encode_categorical_features(df, fit=fit)
        
        # Select features for training
        feature_cols = [
            'year', 'month', 'day_of_year', 'quarter',
            'price_lag_1', 'price_lag_7', 'price_lag_30',
            'price_ma_7', 'price_ma_30',
            'price_volatility_7', 'price_volatility_30',
            'seasonal_avg', 'price_vs_seasonal',
            'supply_demand_ratio', 'quantity',
            'crop_encoded', 'state_encoded', 'district_encoded', 'market_encoded'
        ]
        
        # Filter available columns
        available_cols = [col for col in feature_cols if col in df.columns]
        X = df[available_cols].copy()
        
        # Handle missing values
        X = X.fillna(X.mean())
        
        # Scale features
        if fit:
            X_scaled = self.scaler.fit_transform(X)
            self.feature_names = available_cols
        else:
            X_scaled = self.scaler.transform(X)
        
        y = df['price'].values if 'price' in df.columns else None
        
        return X_scaled, y
    
    def train_models(self, df: pd.DataFrame) -> Dict[str, float]:
        """
        Train all ML models and return performance metrics
        """
        # Preprocess data
        X, y = self.preprocess_data(df, fit=True)
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, shuffle=True
        )
        
        # Train models
        print("Training Random Forest model...")
        self.rf_model.fit(X_train, y_train)
        
        print("Training Gradient Boosting model...")
        self.gb_model.fit(X_train, y_train)
        
        print("Training Linear Regression model...")
        self.linear_model.fit(X_train, y_train)
        
        # Evaluate models
        models = {
            'Random Forest': self.rf_model,
            'Gradient Boosting': self.gb_model,
            'Linear Regression': self.linear_model
        }
        
        results = {}
        for name, model in models.items():
            y_pred = model.predict(X_test)
            mae = mean_absolute_error(y_test, y_pred)
            mse = mean_squared_error(y_test, y_pred)
            r2 = r2_score(y_test, y_pred)
            
            results[name] = {
                'MAE': mae,
                'MSE': mse,
                'RMSE': np.sqrt(mse),
                'R2': r2
            }
            
            print(f"\n{name} Performance:")
            print(f"MAE: {mae:.2f}")
            print(f"RMSE: {np.sqrt(mse):.2f}")
            print(f"R2 Score: {r2:.3f}")
        
        self.is_trained = True
        return results
    
    def predict_price(self, crop: str, state: str, district: str, market: str, 
                     date: str, quantity: float = 1000) -> Dict[str, float]:
        """
        Predict crop price using ensemble of trained models
        """
        if not self.is_trained:
            raise ValueError("Models not trained yet!")
        
        # Create input dataframe
        input_data = pd.DataFrame({
            'crop': [crop],
            'state': [state],
            'district': [district],
            'market': [market],
            'date': [date],
            'quantity': [quantity],
            'price': [0]  # Dummy value
        })
        
        # Add historical data (simplified - in production, fetch from database)
        # For demo, using dummy historical prices
        np.random.seed(42)
        input_data['price_lag_1'] = np.random.normal(2000, 300)
        input_data['price_lag_7'] = np.random.normal(1950, 250)
        input_data['price_lag_30'] = np.random.normal(1900, 200)
        
        # Preprocess
        X, _ = self.preprocess_data(input_data, fit=False)
        
        # Get predictions from all models
        rf_pred = self.rf_model.predict(X)[0]
        gb_pred = self.gb_model.predict(X)[0]
        linear_pred = self.linear_model.predict(X)[0]
        
        # Ensemble prediction (weighted average)
        ensemble_pred = (0.5 * rf_pred + 0.3 * gb_pred + 0.2 * linear_pred)
        
        # Calculate confidence intervals
        predictions = np.array([rf_pred, gb_pred, linear_pred])
        std_dev = np.std(predictions)
        
        return {
            'predicted_price': round(ensemble_pred, 2),
            'confidence_interval_lower': round(ensemble_pred - 1.96 * std_dev, 2),
            'confidence_interval_upper': round(ensemble_pred + 1.96 * std_dev, 2),
            'random_forest_prediction': round(rf_pred, 2),
            'gradient_boosting_prediction': round(gb_pred, 2),
            'linear_regression_prediction': round(linear_pred, 2),
            'model_agreement': round(1 - (std_dev / ensemble_pred), 3)
        }
    
    def get_feature_importance(self) -> Dict[str, float]:
        """
        Get feature importance from Random Forest model
        """
        if not self.is_trained:
            raise ValueError("Models not trained yet!")
        
        importance_dict = {}
        for feature, importance in zip(self.feature_names, self.rf_model.feature_importances_):
            importance_dict[feature] = round(importance, 4)
        
        # Sort by importance
        return dict(sorted(importance_dict.items(), key=lambda x: x[1], reverse=True))
    
    def save_models(self, filepath: str = 'crop_price_models.pkl'):
        """
        Save trained models to disk
        """
        model_data = {
            'rf_model': self.rf_model,
            'gb_model': self.gb_model,
            'linear_model': self.linear_model,
            'scaler': self.scaler,
            'label_encoders': self.label_encoders,
            'feature_names': self.feature_names,
            'is_trained': self.is_trained
        }
        joblib.dump(model_data, filepath)
        print(f"Models saved to {filepath}")
    
    def load_models(self, filepath: str = 'crop_price_models.pkl'):
        """
        Load trained models from disk
        """
        model_data = joblib.load(filepath)
        self.rf_model = model_data['rf_model']
        self.gb_model = model_data['gb_model']
        self.linear_model = model_data['linear_model']
        self.scaler = model_data['scaler']
        self.label_encoders = model_data['label_encoders']
        self.feature_names = model_data['feature_names']
        self.is_trained = model_data['is_trained']
        print(f"Models loaded from {filepath}")

# Demo data generator for testing
def generate_dummy_crop_data(n_samples: int = 10000) -> pd.DataFrame:
    """
    Generate dummy crop price data for training
    """
    np.random.seed(42)
    
    crops = ['Rice', 'Wheat', 'Tomato', 'Onion', 'Potato', 'Cotton', 'Sugarcane']
    states = ['Maharashtra', 'Punjab', 'Uttar Pradesh', 'Tamil Nadu', 'Karnataka', 'Gujarat']
    districts = ['District_A', 'District_B', 'District_C', 'District_D']
    markets = ['Market_1', 'Market_2', 'Market_3', 'Market_4', 'Market_5']
    
    data = []
    start_date = datetime.datetime(2020, 1, 1)
    
    for i in range(n_samples):
        date = start_date + datetime.timedelta(days=np.random.randint(0, 1400))
        crop = np.random.choice(crops)
        state = np.random.choice(states)
        district = np.random.choice(districts)
        market = np.random.choice(markets)
        
        # Generate realistic price based on crop and seasonality
        base_prices = {
            'Rice': 2000, 'Wheat': 1800, 'Tomato': 1500, 'Onion': 1200,
            'Potato': 1000, 'Cotton': 5000, 'Sugarcane': 3000
        }
        
        base_price = base_prices[crop]
        seasonal_factor = 1 + 0.3 * np.sin(2 * np.pi * date.month / 12)
        random_factor = np.random.normal(1, 0.2)
        
        price = base_price * seasonal_factor * random_factor
        quantity = np.random.normal(1000, 200)
        
        data.append({
            'date': date.strftime('%Y-%m-%d'),
            'crop': crop,
            'state': state,
            'district': district,
            'market': market,
            'price': max(price, 100),  # Minimum price
            'quantity': max(quantity, 10)  # Minimum quantity
        })
    
    return pd.DataFrame(data)

# API Integration code for React frontend
class CropPriceAPI:
    """
    Flask API endpoints for ML model integration
    """
    
    def __init__(self):
        self.model = CropPricePredictionModel()
        
    def predict_endpoint(self, request_data: Dict) -> Dict:
        """
        API endpoint for price prediction
        """
        try:
            prediction = self.model.predict_price(
                crop=request_data['crop'],
                state=request_data['state'],
                district=request_data['district'],
                market=request_data['market'],
                date=request_data['date'],
                quantity=request_data.get('quantity', 1000)
            )
            
            return {
                'status': 'success',
                'prediction': prediction,
                'model_info': {
                    'algorithms_used': ['Random Forest', 'Gradient Boosting', 'Linear Regression'],
                    'ensemble_method': 'Weighted Average',
                    'confidence_level': '95%'
                }
            }
        except Exception as e:
            return {
                'status': 'error',
                'message': str(e)
            }
    
    def feature_importance_endpoint(self) -> Dict:
        """
        API endpoint for feature importance
        """
        try:
            importance = self.model.get_feature_importance()
            return {
                'status': 'success',
                'feature_importance': importance
            }
        except Exception as e:
            return {
                'status': 'error',
                'message': str(e)
            }

# Example usage and training
if __name__ == "__main__":
    # Initialize model
    model = CropPricePredictionModel()
    
    # Generate dummy training data
    print("Generating dummy crop price data...")
    df = generate_dummy_crop_data(10000)
    print(f"Generated {len(df)} training samples")
    
    # Train models
    print("\nTraining ML models...")
    results = model.train_models(df)
    
    # Make predictions
    print("\nMaking sample predictions...")
    sample_prediction = model.predict_price(
        crop='Rice',
        state='Maharashtra',
        district='District_A',
        market='Market_1',
        date='2024-08-15',
        quantity=1500
    )
    
    print(f"\nSample Prediction for Rice in Maharashtra:")
    for key, value in sample_prediction.items():
        print(f"{key}: {value}")
    
    # Show feature importance
    print("\nTop 10 Most Important Features:")
    importance = model.get_feature_importance()
    for i, (feature, imp) in enumerate(list(importance.items())[:10]):
        print(f"{i+1}. {feature}: {imp}")
    
    # Save models
    model.save_models('mandimitra_ml_models.pkl')
    print("\nModels saved successfully!")

# JavaScript/React integration code
"""
// Frontend JavaScript code for React integration

const predictCropPrice = async (cropData) => {
  try {
    const response = await fetch('/api/predict-price', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        crop: cropData.crop,
        state: cropData.state,
        district: cropData.district,
        market: cropData.market,
        date: cropData.date,
        quantity: cropData.quantity || 1000
      })
    });
    
    const result = await response.json();
    
    if (result.status === 'success') {
      return {
        predictedPrice: result.prediction.predicted_price,
        confidenceInterval: [
          result.prediction.confidence_interval_lower,
          result.prediction.confidence_interval_upper
        ],
        modelPredictions: {
          randomForest: result.prediction.random_forest_prediction,
          gradientBoosting: result.prediction.gradient_boosting_prediction,
          linearRegression: result.prediction.linear_regression_prediction
        },
        accuracy: result.prediction.model_agreement
      };
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Price prediction error:', error);
    throw error;
  }
};

// React component usage
const PricePredictionDashboard = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handlePrediction = async (formData) => {
    setLoading(true);
    try {
      const result = await predictCropPrice(formData);
      setPrediction(result);
    } catch (error) {
      console.error('Prediction failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="prediction-dashboard">
      {prediction && (
        <div className="prediction-results">
          <h3>Price Prediction: ₹{prediction.predictedPrice}/quintal</h3>
          <p>Confidence Interval: ₹{prediction.confidenceInterval[0]} - ₹{prediction.confidenceInterval[1]}</p>
          <div className="model-breakdown">
            <p>Random Forest: ₹{prediction.modelPredictions.randomForest}</p>
            <p>Gradient Boosting: ₹{prediction.modelPredictions.gradientBoosting}</p>
            <p>Linear Regression: ₹{prediction.modelPredictions.linearRegression}</p>
          </div>
          <p>Model Agreement: {(prediction.accuracy * 100).toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
};
"""
