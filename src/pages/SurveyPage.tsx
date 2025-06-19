
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal'
];

const districts = [
  'Adilabad', 'Ahmednagar', 'Akola', 'Alappuzha', 'Amarawati', 'Ariyalur', 'Bangalore', 'Beed', 
  'Belgaum', 'Bellary', 'Bhandara', 'Buldhana', 'Chamrajnagar', 'Chandrapur', 'Chattrapati Sambhajinagar', 
  'Chengalpattu', 'Chikmagalur', 'Chitradurga', 'Chittor', 'Coimbatore', 'Cuddalore', 'Davangere', 
  'Delhi', 'Dharashiv(Usmanabad)', 'Dharmapuri', 'Dharwad', 'Dhule', 'Dindigul', 'East Godavari', 
  'Ernakulam', 'Erode', 'Gadchiroli', 'Guntur', 'Hyderabad', 'Idukki', 'Jalana', 'Jalgaon', 
  'Kallakuruchi', 'Kancheepuram', 'Kannur', 'Karimnagar', 'Karur', 'Karwar(Uttar Kannad)', 'Kasargod', 
  'Khammam', 'Kolar', 'Kolhapur', 'Kollam', 'Koppal', 'Kottayam', 'Kozhikode(Calicut)', 'Krishna', 
  'Krishnagiri', 'Kurnool', 'Madikeri(Kodagu)', 'Madurai', 'Mahbubnagar', 'Malappuram', 
  'Mangalore(Dakshin Kannad)', 'Medak', 'Mumbai', 'Nagapattinam', 'Nagercoil (Kannyiakumari)', 
  'Nagpur', 'Nalgonda', 'Namakkal', 'Nashik', 'Palakad', 'Parbhani', 'Pathanamthitta', 'Perambalur', 
  'Pudukkottai', 'Pune', 'Raichur', 'Raigad', 'Ramanathapuram', 'Ranga Reddy', 'Ranipet', 'Ratnagiri', 
  'Salem', 'Sangli', 'Satara', 'Shimoga', 'Sholapur', 'Sivaganga', 'Tenkasi', 'Thane', 'Thanjavur', 
  'The Nilgiris', 'Theni', 'Thirssur', 'Thiruchirappalli', 'Thirunelveli', 'Thirupathur', 'Thirupur', 
  'Thiruvananthapuram', 'Thiruvannamalai', 'Thiruvarur', 'Thiruvellore', 'Tuticorin', 'Udupi', 
  'Vashim', 'Vellore', 'Villupuram', 'Virudhunagar', 'Warangal', 'Wardha', 'Wayanad', 'West Godavari', 'Yavatmal'
];

const markets = [
  'Achalpur', 'Adimali', 'AJattihalli(Uzhavar Sandhai )', 'Akluj', 'Akola', 'Alampur', 'Alangudi(Uzhavar Sandhai )', 
  'Alengad  VFPCK', 'Alibagh', 'Aluva', 'Amalapuram  VFPCK', 'Amarawati', 'Ambajipeta', 'Amballur  VFPCK', 
  'Ambasamudram(Uzhavar Sandhai )', 'Ambattur(Uzhavar Sandhai )', 'Ammapet(Uzhavar Sandhai )', 'Ammoor', 
  'Amrawati(Frui & Veg. Market)', 'Anaiyur(Uzhavar Sandhai )', 'Anchal', 'Andipatti(Uzhavar Sandhai )', 'Angamaly', 
  'Anna nagar(Uzhavar Sandhai )', 'Annamanada  VFPCK', 'Arani(Uzhavar Sandhai )', 'Aranthangi(Uzhavar Sandhai )', 
  'Arcot(Uzhavar Sandhai )', 'Ariyalur(Uzhavar Sandhai)', 'Armori', 'Aruppukottai(Uzhavar Sandhai )', 
  'ATHANIKKAL VFPCK', 'Athirampuzha', 'Athur(Uzhavar Sandhai )', 'Attayampatti(Uzhavar Sandhai )', 
  'Avallapalli(Uzhavar Sandhai )', 'Avalurpet', 'Azadpur', 'Babhulgaon', 'Bailahongal', 'Bangarpet', 
  'Bangarupalem', 'Barshi', 'Barshi(Vairag)', 'Beed', 'Bhainsa', 'Bhandara', 'Binny Mill (F&V), Bangalore', 
  'Bodinayakanur(Uzhavar Sandhai )', 'Brahmpuri', 'Burgampadu', 'Chamaraj Nagar', 'Chandrapur(Ganjwad)', 
  'Chandvad', 'Chattrapati Sambhajinagar', 'Chavakkad', 'Chavassery VFPCK', 'CHAZHUR VFPCK', 'Chelakkara', 
  'CHELAKKARA VFPCK', 'Chengalpet(Uzhavar Sandhai )', 'Chengam(Uzhavar Sandhai )', 'Chengannur', 
  'CHENNITHALA VFPCK', 'Cherthala', 'Chethupattu', 'Chevella', 'Cheyyar', 'Cheyyar(Uzhavar Sandhai )', 
  'Chidambaram(Uzhavar Sandhai )', 'Chikkamagalore', 'Chinnalapatti(Uzhavar Sandhai )', 'Chinnamanur(Uzhavar Sandhai )', 
  'Chinnoar', 'Chintalapudi', 'Chintamani', 'Chitradurga', 'Chittoor', 'Chokkikulam(Uzhavar Sandhai )', 'Chopada', 
  'Coonoor(Uzhavar Sandhai )', 'Cuddalore(Uzhavar Sandhai )', 'Dammapet', 'Davangere', 'Denkanikottai(Uzhavar Sandhai )', 
  'Devakottai (Uzhavar Sandhai )', 'Devala', 'Devarakonda', 'Devaram(Uzhavar Sandhai )', 'Devarkonda(Dindi)', 
  'Devarkonda(Mallepalli)', 'Dharapuram(Uzhavar Sandhai )', 'Dharmapuri(Uzhavar Sandhai )', 'Dhule', 
  'Dindigul(Uzhavar Sandhai )', 'Dudhani', 'Edapadi (Uzhavar Sandhai )', 'EDATHWA VFPCK', 'Elamkur  VFPCK', 
  'Elampillai(Uzhavar Sandhai )', 'Elevancheri VFPCK', 'Eluru', 'Erath  VFPCK', 'Ernakulam', 'Ettumanoor', 
  'Flower Market,Gazipur', 'Gaddiannaram', 'Gadwal', 'Gadwal(Lezza)', 'Gajwel', 'Gandarvakottai(Uzhavar Sandhai )', 
  'Gandchiroli', 'Gangadhara', 'Gangakhed', 'Gangavathi', 'Gingee(Uzhavar Sandhai )', 'Gobichettipalayam(Uzhavar Sandhai )',
  'Gonikappal', 'Gudalur(Uzhavar Sandhai )', 'Gudimalkapur', 'Gudiyatham(Uzhavar Sandhai )', 'Guduvancheri(Uzhavar Sandhai )',
  'Gundlupet', 'Guntur', 'Haliyala', 'Harippad', 'Harur(Uzhavar Sandhai )', 'Hasthampatti(Uzhavar Sandhai )', 
  'Hinganghat', 'Hingna', 'Hiriyur', 'Hosur(Uzhavar Sandhai )', 'Hubli (Amaragol)', 'Huzumnagar(Garidepally)', 
  'Huzurnagar', 'Huzurnagar(Matampally)', 'Huzzurabad', 'Irityy', 'Jalagandapuram(Uzhavar Sandhai )', 'Jalana', 
  'Jameenrayapettai(Uzhavar Sandhai )', 'Jamkhed', 'Jeyankondam (Uzhavar Sandhai )', 'Jintur', 'Junnar(Narayangaon)', 
  'Junnar(Otur)', 'Kadungallur  VFPCK', 'Kahithapattarai(Uzhavar Sandhai )', 'Kalagategi', 'Kalamb', 'Kallachi', 
  'Kallakurichi', 'Kallakurichi(Uzhavar Sandhai )', 'Kalvan', 'Kalyan', 'Kamakshi VFPCK', 'Kambam(Uzhavar Sandhai )', 
  'Kancheepuram(Uzhavar Sandhai )', 'Kandiyaperi(Uzhavar Sandhai )', 'Kangayam(Uzhavar Sandhai )', 'Kanjangadu', 
  'KANNAKUNNU VFPCK', 'Kannur', 'Karad', 'Karaikudi(Uzhavar Sandhai )', 'KARALAM VFPCK', 'Karambakkudi(Uzhavar Sandhai )', 
  'Karimnagar', 'KARIMPUZHA VFPCK', 'Kariyapatti(Uzhavar Sandhai )', 'Karjat', 'Karjat(Raigad)', 'Karmala', 
  'KARUMALOOR VFPCK', 'Karur(Uzhavar Sandhai )', 'Katol', 'Katpadi (Uzhavar Sandhai )', 'Kattampak  VFPCK', 
  'Kattappana', 'Kaveripattinam(Uzhavar Sandhai )', 'Keelpennathur(Uzhavar Sandhai )', 'Keshopur', 'Khammam', 
  'Khed', 'Kille Dharur', 'KILMANNUR VFPCK', 'Kilpennathur', 'Kizhakkancheri VFPCK', 'Kodad', 'Koduvayoor', 
  'KOLAYAD VFPCK', 'Kolhapur', 'Kollam', 'Kollayil  VFPCK', 'Kondotty', 'Kothamangalam', 'Kottur', 
  'Kovilnada  VFPCK', 'Kovilpatti(Uzhavar Sandhai )', 'Krishnagiri(Uzhavar Sandhai )', 'Kudchi', 
  'Kukatpally(Rythu Bazar)', 'Kulithalai(Uzhavar Sandhai )', 'Kumarapalayam(Uzhavar Sandhai )', 
  'Kumbakonam (Uzhavar Sandhai )', 'Kundrathur(Uzhavar Sandhai )', 'Kunnathukkal VFPCK', 'Kunnukara  VFPCK', 
  'Kurichi(Uzhavar Sandhai )', 'Kuriem  VFPCK', 'Kurnool', 'Kuttoor', 'L B Nagar', 'Lalgudi(Uzhavar Sandhai )', 
  'Lasalgaon(Niphad)', 'Lasalgaon(Vinchur)', 'Madanapalli', 'Madhuranthagam(Uzhavar Sandhai )', 'Madikai  VFPCK', 
  'Mahabubnagar(Rythu Bazar)', 'Mahboob Manison', 'Mailaduthurai', 'Majalgaon', 'MALA VFPCK', 'Malayattoor  VFPCK', 
  'Malkapur', 'Malur', 'Manachanallur(Uzhavar Sandhai )', 'Manakodur', 'Manapparai(Uzhavar Sandhai )', 'Manathavady', 
  'Mangal Wedha', 'Mangalore', 'Mangaon', 'Manjeswaram', 'MANKADA VFPCK', 'Mannackanad  VFPCK', 'Mannar', 
  'Mannargudi I(Uzhavar Sandhai )', 'Mannargudi II(Uzhavar Sandhai )', 'Marottichal  VFPCK', 'Mattannur  VFPCK', 
  'Mayiladuthurai(Uzhavar Sandhai )', 'Medavakkam(Uzhavar Sandhai )', 'Mehekar', 'Mehndipatnam(Rythu Bazar)', 
  'Melapalayam(Uzhavar Sandhai )', 'Melur(Uzhavar Sandhai )', 'Mettupalayam(Uzhavar Sandhai )', 'Mettur(Uzhavar Sandhai )', 
  'Mezhuveli  VFPCK', 'Miryalaguda', 'Mohanur(Uzhavar Sandhai )', 'Mookkannur  VFPCK', 'Mukkom', 'Mul', 'Mulabagilu', 
  'Mulakalacheruvu', 'Mumbai', 'Mumbai- Fruit Market', 'Murbad', 'Muriyad  VFPCK', 'Murud', 'Murum', 
  'Musiri(Uzhavar Sandhai )', 'Muthupettai(Uzhavar Sandhai )', 'Myladi(Uzhavar Sandhai )', 'Nagapattinam(Uzhavar Sandhai )', 
  'Nagpur', 'Namakkal(Uzhavar Sandhai )', 'Nandgaon', 'Nandyal', 'Nanganallur(Uzhavar Sandhai )', 'Naranganam  VFPCK', 
  'Naravarikuppam(Uzhavar Sandhai )', 'Nasik', 'Natrampalli(Uzhavar Sandhai )', 'Neduvathoor  VFPCK', 
  'Needamangalam(Uzhavar Sandhai )', 'Neeleswaram', 'Neredcherla', 'Newasa(Ghodegaon)', 'Neyyatinkara', 
  'Neyyattinkara  VFPCK', 'NGO Colony(Uzhavar Sandhai )', 'Nooluvally  VFPCK', 'North Paravur', 
  'Om Chaitanya Multistate Agro Purpose CoOp Society', 'Othayi  VFPCK', 'Pachora', 'Padappai(Uzhavar Sandhai )', 
  'Palacode(Uzhavar Sandhai )', 'Palakkad', 'Palamaner', 'Palanganatham(Uzhavar Sandhai )', 'Palani(Uzhavar Sandhai )', 
  'Palayam', 'Palayamkottai(Uzhavar Sandhai )', 'Palghar', 'Palladam(Uzhavar Sandhai )', 'Pallapatti (Uzhavar Sandhai )', 
  'Pallavaram(Uzhavar Sandhai )', 'PALLIKKAL VFPCK', 'Pampady', 'PANANCHERY VFPCK', 'Pandharpur', 'Panruti(Uzhavar Sandhai )', 
  'Panvel', 'Papanasam(Uzhavar Sandhai )', 'PAPPANCHANI VFPCK', 'Paramakudi(Uzhavar Sandhai )', 'Paramathivelur(Uzhavar Sandhai )', 
  'Parappanangadi', 'Parassala', 'Partur', 'Paruthipattu(Uzhavar Sandhai )', 'Patan', 'Pattambi', 'Pattiyam  VFPCK', 
  'Pattukottai(Uzhavar Sandhai )', 'Payyannur', 'Pennagaram(Uzhavar Sandhai )', 'Perambakkam(Uzhavar Sandhai )', 
  'Perambalur(Uzhavar Sandhai )', 'Perambra', 'Periyakulam(Uzhavar Sandhai )', 'Periyar Nagar(Uzhavar Sandhai )', 
  'Perumbavoor', 'Perundurai(Uzhavar Sandhai )', 'Pidugurala(Palnadu)', 'Pimpalgaon', 'Pimpalgaon Baswant(Saykheda)', 
  'Piravam', 'Pollachi(Uzhavar Sandhai )', 'Polur(Uzhavar Sandhai )', 'Pombhurni', 'Pothencode', 'Pudukottai(Uzhavar Sandhai )', 
  'Pullur Periya  VFPCK', 'Punalur', 'Pune', 'Pune(Khadiki)', 'Pune(Manjri)', 'Pune(Moshi)', 'Pune(Pimpri)', 
  'Puthenvelikkara  VFPCK', 'PUTHUR VFPCK', 'Puttur', 'Quilandy', 'Rahata', 'Rahuri', 'Rahuri(Vambori)', 'Raichur', 
  'Rajahmundry', 'Rajapalayam(Uzhavar Sandhai )', 'Ramanagara', 'Ramanathapuram(Uzhavar Sandhai )', 'Ramdurga', 
  'Ranipettai(Uzhavar Sandhai )', 'Ranniangadi', 'Rasipuram(Uzhavar Sandhai )', 'Ratnagiri (Nachane)', 'Raver', 
  'Ravulapelem', 'RSPuram(Uzhavar Sandhai )', 'Sampath Nagar(Uzhavar Sandhai )', 'Sangamner', 'Sangarapuram', 
  'Sangli', 'Sangli(Phale, Bhajipura Market)', 'Sankarankoil(Uzhavar Sandhai )', 'Sankarapuram(Uzhavar Sandhai )', 
  'Satana', 'Satara', 'Sathiyamagalam(Uzhavar Sandhai )', 'Sathur(Uzhavar Sandhai )', 'Savali', 'Seethathode  VFPCK', 
  'Shevgaon', 'Shevgaon(Bodhegaon)', 'Shimoga', 'Shivsiddha Govind Producer Company Limited Sanchal', 'Shrirampur', 
  'Sindi', 'Sindi(Selu)', 'Singampunari(Uzhavar Sandhai )', 'Singanallur(Uzhavar Sandhai )', 'Sirkali(Uzhavar Sandhai )', 
  'Sivagangai (Uzhavar Sandhai )', 'Sivakasi(Uzhavar Sandhai )', 'Solapur', 'Sooramangalam(Uzhavar Sandhai )', 'Sorabha', 
  'Srivilliputhur(Uzhavar Sandhai )', 'Sulur(Uzhavar Sandhai )', 'Sundarapuram(Uzhavar Sandhai )', 'Sunguvarchatram(Uzhavar Sandhai )', 
  'Suryapeta', 'Taliparamba', 'Tamarainagar(Uzhavar Sandhai )', 'Tenali', 'Tenkasi(Uzhavar Sandhai )', 'Thalavadi(Uzhavar Sandhai )', 
  'Thalavaipuram(Uzhavar Sandhai )', 'Thammampatti (Uzhavar Sandhai )', 'Thanjavur(Uzhavar Sandhai )', 'Thathakapatti(Uzhavar Sandhai )', 
  'Theni(Uzhavar Sandhai )', 'Thenkasi', 'Thirukalukundram(Uzhavar Sandhai )', 'Thirukovilur', 'Thirumangalam(Uzhavar Sandhai )', 
  'Thirupathur', 'Thirurrangadi', 'Thiruvaniyoor  VFPCK', 'Thodupuzha', 'Thottuva  VFPCK', 'Thrippunithura', 'Thrissur', 
  'Thuraiyur', 'THURAVOOR VFPCK', 'Tindivanam', 'Tiruchengode', 'Tirumalagiri', 'Tirupatthur(Uzhavar Sandhai )', 
  'Tiruppur (North) (Uzhavar Sandhai )', 'Tiruppur (South) (Uzhavar Sandhai )', 'Tiruthuraipoondi(Uzhavar Sandhai )', 
  'Tiruvallur(Uzhavar Sandhai )', 'Tiruvannamalai(Uzhavar Sandhai )', 'Tiruvarur(Uzhavar Sandhai )', 'Tiruvuru', 
  'Tuljapur', 'Tuticorin(Uzhavar Sandhai )', 'Udhagamandalam(Uzhavar Sandhai )', 'Udumalpet', 'Udupi', 'Ulhasnagar', 
  'Ulundurpettai', 'Umarga', 'Umrane', 'Usilampatty', 'vadakarapathy', 'Vadakkenchery', 'Vadaseri', 'Vadavalli(Uzhavar Sandhai )', 
  'Vai', 'Valangaiman', 'Vallam', 'Vamanapuram', 'Vandavasi(Uzhavar Sandhai )', 'Vandiperiyar', 'Vaniyambadi', 
  'Vaniyamkulam  VFPCK', 'Vaniyampadi(Uzhavar Sandhai )', 'Varandarappilly  VFPCK', 'Vasai', 'Vashi New Mumbai', 
  'Vathlagundu', 'Vayala  VFPCK', 'Vayalapadu', 'Vedasanthur(Uzhavar Sandhai )', 'Velayuthampalayam(Uzhavar Sandhai )', 
  'Vellore', 'Vengeri(Kozhikode)', 'Vikkiravandi', 'Villupuram', 'Viralimalai(Uzhavar Sandhai )', 'Virudhunagar(Uzhavar Sandhai )', 
  'Viruthachalam(Uzhavar Sandhai )', 'Vita', 'Warangal', 'Wardha', 'Washim', 'Wyra', 'Yeola', 'Yeotmal', 'Zaheerabad'
];

const commodities = [
  'Apple', 'Banana', 'Banana - Green', 'Beetroot', 'Bengal Gram(Gram)(Whole)', 'Betal Leaves', 'Bhindi(Ladies Finger)', 
  'Bitter gourd', 'Bottle gourd', 'Brinjal', 'Cabbage', 'Capsicum', 'Carrot', 'Cauliflower', 'Coconut', 'Coffee', 
  'Coriander(Leaves)', 'Cucumbar(Kheera)', 'Drumstick', 'Dry Chillies', 'French Beans (Frasbean)', 'Garlic', 
  'Ginger(Green)', 'Grapes', 'Green Chilli', 'Jack Fruit', 'Lemon', 'Maize', 'Mango', 'Mango (Raw-Ripe)', 
  'Onion', 'Paddy(Dhan)(Common)', 'Papaya', 'Pineapple', 'Potato', 'Pumpkin', 'Ragi (Finger Millet)', 'Rice', 
  'Rose(Loose))', 'Spinach', 'Sunflower', 'Tender Coconut', 'Tomato', 'Water Melon', 'Wheat'
];

interface SurveyPageProps {
  onComplete: (data: any) => void;
  onBack?: () => void;
}

const SurveyPage = ({ onComplete, onBack }: SurveyPageProps) => {
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    district: '',
    market: '',
    crops: [] as string[]
  });

  const [districtSearch, setDistrictSearch] = useState('');
  const [marketSearch, setMarketSearch] = useState('');
  const [cropSearch, setCropSearch] = useState('');
  const { t } = useLanguage();

  const filteredDistricts = districts.filter(d =>
    d.toLowerCase().includes(districtSearch.toLowerCase())
  );

  const filteredMarkets = markets.filter(m =>
    m.toLowerCase().includes(marketSearch.toLowerCase())
  );

  const filteredCrops = commodities.filter(c =>
    c.toLowerCase().includes(cropSearch.toLowerCase()) && !formData.crops.includes(c)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.state || !formData.district || !formData.market || formData.crops.length === 0) {
      alert(t('please_fill_fields'));
      return;
    }
    
    // Store the complete survey data
    const surveyData = {
      ...formData,
      completedAt: new Date().toISOString()
    };
    
    console.log('Survey data being stored:', surveyData);
    onComplete(surveyData);
  };

  const handleCropSelect = (crop: string) => {
    if (!formData.crops.includes(crop)) {
      setFormData(prev => ({
        ...prev,
        crops: [...prev.crops, crop]
      }));
    }
    setCropSearch('');
  };

  const removeCrop = (cropToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      crops: prev.crops.filter(crop => crop !== cropToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center relative">
          {onBack && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="absolute left-0 top-0 mt-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('back')}
            </Button>
          )}
          <CardTitle className="text-2xl font-bold text-gray-900">{t('complete_profile')}</CardTitle>
          <p className="text-gray-600">{t('help_personalize')}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">{t('name')}</Label>
              <Input
                id="name"
                type="text"
                placeholder={t('enter_name')}
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="state">{t('state')}</Label>
              <Select value={formData.state} onValueChange={(value) => setFormData(prev => ({ ...prev, state: value, district: '', market: '' }))}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_state')} />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="district">{t('district')}</Label>
              <div className="relative">
                <Input
                  id="district"
                  type="text"
                  placeholder={t('search_district')}
                  value={districtSearch}
                  onChange={(e) => setDistrictSearch(e.target.value)}
                />
                {districtSearch && filteredDistricts.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                    {filteredDistricts.slice(0, 10).map((district) => (
                      <div
                        key={district}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, district, market: '' }));
                          setDistrictSearch(district);
                        }}
                      >
                        {district}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {formData.district && (
                <p className="text-sm text-green-600 mt-1">Selected: {formData.district}</p>
              )}
            </div>

            <div>
              <Label htmlFor="market">{t('survey_market')}</Label>
              <div className="relative">
                <Input
                  id="market"
                  type="text"
                  placeholder={t('search_market')}
                  value={marketSearch}
                  onChange={(e) => setMarketSearch(e.target.value)}
                />
                {marketSearch && filteredMarkets.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                    {filteredMarkets.slice(0, 10).map((market) => (
                      <div
                        key={market}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, market }));
                          setMarketSearch(market);
                        }}
                      >
                        {market}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {formData.market && (
                <p className="text-sm text-green-600 mt-1">Selected: {formData.market}</p>
              )}
            </div>

            <div>
              <Label htmlFor="crops">{t('crops')}</Label>
              <div className="relative">
                <Input
                  id="crops"
                  type="text"
                  placeholder={t('search_crops')}
                  value={cropSearch}
                  onChange={(e) => setCropSearch(e.target.value)}
                />
                {cropSearch && filteredCrops.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                    {filteredCrops.slice(0, 10).map((crop) => (
                      <div
                        key={crop}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleCropSelect(crop)}
                      >
                        {crop}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {formData.crops.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Selected crops:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.crops.map((crop) => (
                      <span
                        key={crop}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {crop}
                        <button
                          type="button"
                          onClick={() => removeCrop(crop)}
                          className="text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-green-700">
              {t('complete_setup')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyPage;
