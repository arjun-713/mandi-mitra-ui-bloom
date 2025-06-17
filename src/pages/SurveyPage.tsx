
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface SurveyPageProps {
  onComplete: (surveyData: any) => void;
}

const SurveyPage = ({ onComplete }: SurveyPageProps) => {
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
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showMarketDropdown, setShowMarketDropdown] = useState(false);
  const [showCropDropdown, setShowCropDropdown] = useState(false);

  const states = [
    'Andhra Pradesh', 'Karnataka', 'Kerala', 'Maharashtra', 
    'NCT of Delhi', 'Tamil Nadu', 'Telangana'
  ];

  const districts = [
    'Adilabad', 'Ahmednagar', 'Akola', 'Alappuzha', 'Amarawati', 'Ariyalur', 'Bangalore',
    'Beed', 'Belgaum', 'Bellary', 'Bhandara', 'Buldhana', 'Chamrajnagar', 'Chandrapur',
    'Chattrapati Sambhajinagar', 'Chengalpattu', 'Chikmagalur', 'Chitradurga', 'Chittor',
    'Coimbatore', 'Cuddalore', 'Davangere', 'Delhi', 'Dharashiv(Usmanabad)', 'Dharmapuri',
    'Dharwad', 'Dhule', 'Dindigul', 'East Godavari', 'Ernakulam', 'Erode', 'Gadchiroli',
    'Guntur', 'Hyderabad', 'Idukki', 'Jalana', 'Jalgaon', 'Kallakuruchi', 'Kancheepuram',
    'Kannur', 'Karimnagar', 'Karur', 'Karwar(Uttar Kannad)', 'Kasargod', 'Khammam',
    'Kolar', 'Kolhapur', 'Kollam', 'Koppal', 'Kottayam', 'Kozhikode(Calicut)', 'Krishna',
    'Krishnagiri', 'Kurnool', 'Madikeri(Kodagu)', 'Madurai', 'Mahbubnagar', 'Malappuram',
    'Mangalore(Dakshin Kannad)', 'Medak', 'Mumbai', 'Nagapattinam', 'Nagercoil (Kannyiakumari)',
    'Nagpur', 'Nalgonda', 'Namakkal', 'Nashik', 'Palakad', 'Parbhani', 'Pathanamthitta',
    'Perambalur', 'Pudukkottai', 'Pune', 'Raichur', 'Raigad', 'Ramanathapuram', 'Ranga Reddy',
    'Ranipet', 'Ratnagiri', 'Salem', 'Sangli', 'Satara', 'Shimoga', 'Sholapur', 'Sivaganga',
    'Tenkasi', 'Thane', 'Thanjavur', 'The Nilgiris', 'Theni', 'Thirssur', 'Thiruchirappalli',
    'Thirunelveli', 'Thirupathur', 'Thirupur', 'Thiruvananthapuram', 'Thiruvannamalai',
    'Thiruvarur', 'Thiruvellore', 'Tuticorin', 'Udupi', 'Vashim', 'Vellore', 'Villupuram',
    'Virudhunagar', 'Warangal', 'Wardha', 'Wayanad', 'West Godavari', 'Yavatmal'
  ];

  const markets = [
    'Achalpur', 'Adimali', 'AJattihalli(Uzhavar Sandhai )', 'Akluj', 'Akola', 'Alampur',
    'Alangudi(Uzhavar Sandhai )', 'Alengad  VFPCK', 'Alibagh', 'Aluva', 'Amalapuram  VFPCK',
    'Amarawati', 'Ambajipeta', 'Amballur  VFPCK', 'Ambasamudram(Uzhavar Sandhai )',
    'Ambattur(Uzhavar Sandhai )', 'Ammapet(Uzhavar Sandhai )', 'Ammoor', 'Amrawati(Frui & Veg. Market)',
    'Anaiyur(Uzhavar Sandhai )', 'Anchal', 'Andipatti(Uzhavar Sandhai )', 'Angamaly',
    'Anna nagar(Uzhavar Sandhai )', 'Annamanada  VFPCK', 'Arani(Uzhavar Sandhai )',
    'Aranthangi(Uzhavar Sandhai )', 'Arcot(Uzhavar Sandhai )', 'Ariyalur(Uzhavar Sandhai)',
    'Armori', 'Aruppukottai(Uzhavar Sandhai )', 'ATHANIKKAL VFPCK', 'Athirampuzha',
    'Athur(Uzhavar Sandhai )', 'Attayampatti(Uzhavar Sandhai )', 'Avallapalli(Uzhavar Sandhai )',
    'Avalurpet', 'Azadpur', 'Babhulgaon', 'Bailahongal', 'Bangarpet', 'Bangarupalem',
    'Barshi', 'Barshi(Vairag)', 'Beed', 'Bhainsa', 'Bhandara', 'Binny Mill (F&V), Bangalore',
    'Bodinayakanur(Uzhavar Sandhai )', 'Brahmpuri', 'Burgampadu', 'Chamaraj Nagar',
    'Chandrapur(Ganjwad)', 'Chandvad', 'Chattrapati Sambhajinagar', 'Chavakkad',
    'Chavassery VFPCK', 'CHAZHUR VFPCK', 'Chelakkara', 'CHELAKKARA VFPCK',
    'Chengalpet(Uzhavar Sandhai )', 'Chengam(Uzhavar Sandhai )', 'Chengannur',
    'CHENNITHALA VFPCK', 'Cherthala', 'Chethupattu', 'Chevella', 'Cheyyar',
    'Cheyyar(Uzhavar Sandhai )', 'Chidambaram(Uzhavar Sandhai )', 'Chikkamagalore',
    'Chinnalapatti(Uzhavar Sandhai )', 'Chinnamanur(Uzhavar Sandhai )', 'Chinnoar',
    'Chintalapudi', 'Chintamani', 'Chitradurga', 'Chittoor', 'Chokkikulam(Uzhavar Sandhai )',
    'Chopada', 'Coonoor(Uzhavar Sandhai )', 'Cuddalore(Uzhavar Sandhai )', 'Dammapet',
    'Davangere', 'Denkanikottai(Uzhavar Sandhai )', 'Devakottai (Uzhavar Sandhai )',
    'Devala', 'Devarakonda', 'Devaram(Uzhavar Sandhai )', 'Devarkonda(Dindi)',
    'Devarkonda(Mallepalli)', 'Dharapuram(Uzhavar Sandhai )', 'Dharmapuri(Uzhavar Sandhai )',
    'Dhule', 'Dindigul(Uzhavar Sandhai )', 'Dudhani', 'Edapadi (Uzhavar Sandhai )',
    'EDATHWA VFPCK', 'Elamkur  VFPCK', 'Elampillai(Uzhavar Sandhai )', 'Elevancheri VFPCK',
    'Eluru', 'Erath  VFPCK', 'Ernakulam', 'Ettumanoor', 'Flower Market,Gazipur',
    'Gaddiannaram', 'Gadwal', 'Gadwal(Lezza)', 'Gajwel', 'Gandarvakottai(Uzhavar Sandhai )',
    'Gandchiroli', 'Gangadhara', 'Gangakhed', 'Gangavathi', 'Gingee(Uzhavar Sandhai )',
    'Gobichettipalayam(Uzhavar Sandhai )', 'Gonikappal', 'Gudalur(Uzhavar Sandhai )',
    'Gudimalkapur', 'Gudiyatham(Uzhavar Sandhai )', 'Guduvancheri(Uzhavar Sandhai )',
    'Gundlupet', 'Guntur', 'Haliyala', 'Harippad', 'Harur(Uzhavar Sandhai )',
    'Hasthampatti(Uzhavar Sandhai )', 'Hinganghat', 'Hingna', 'Hiriyur',
    'Hosur(Uzhavar Sandhai )', 'Hubli (Amaragol)', 'Huzumnagar(Garidepally)',
    'Huzurnagar', 'Huzurnagar(Matampally)', 'Huzzurabad', 'Irityy',
    'Jalagandapuram(Uzhavar Sandhai )', 'Jalana', 'Jameenrayapettai(Uzhavar Sandhai )',
    'Jamkhed', 'Jeyankondam (Uzhavar Sandhai )', 'Jintur', 'Junnar(Narayangaon)',
    'Junnar(Otur)', 'Kadungallur  VFPCK', 'Kahithapattarai(Uzhavar Sandhai )',
    'Kalagategi', 'Kalamb', 'Kallachi', 'Kallakurichi', 'Kallakurichi(Uzhavar Sandhai )',
    'Kalvan', 'Kalyan', 'Kamakshi VFPCK', 'Kambam(Uzhavar Sandhai )',
    'Kancheepuram(Uzhavar Sandhai )', 'Kandiyaperi(Uzhavar Sandhai )',
    'Kangayam(Uzhavar Sandhai )', 'Kanjangadu', 'KANNAKUNNU VFPCK', 'Kannur',
    'Karad', 'Karaikudi(Uzhavar Sandhai )', 'KARALAM VFPCK',
    'Karambakkudi(Uzhavar Sandhai )', 'Karimnagar', 'KARIMPUZHA VFPCK',
    'Kariyapatti(Uzhavar Sandhai )', 'Karjat', 'Karjat(Raigad)', 'Karmala',
    'KARUMALOOR VFPCK', 'Karur(Uzhavar Sandhai )', 'Katol',
    'Katpadi (Uzhavar Sandhai )', 'Kattampak  VFPCK', 'Kattappana',
    'Kaveripattinam(Uzhavar Sandhai )', 'Keelpennathur(Uzhavar Sandhai )',
    'Keshopur', 'Khammam', 'Khed', 'Kille Dharur', 'KILMANNUR VFPCK',
    'Kilpennathur', 'Kizhakkancheri VFPCK', 'Kodad', 'Koduvayoor',
    'KOLAYAD VFPCK', 'Kolhapur', 'Kollam', 'Kollayil  VFPCK', 'Kondotty',
    'Kothamangalam', 'Kottur', 'Kovilnada  VFPCK', 'Kovilpatti(Uzhavar Sandhai )',
    'Krishnagiri(Uzhavar Sandhai )', 'Kudchi', 'Kukatpally(Rythu Bazar)',
    'Kulithalai(Uzhavar Sandhai )', 'Kumarapalayam(Uzhavar Sandhai )',
    'Kumbakonam (Uzhavar Sandhai )', 'Kundrathur(Uzhavar Sandhai )',
    'Kunnathukkal VFPCK', 'Kunnukara  VFPCK', 'Kurichi(Uzhavar Sandhai )',
    'Kuriem  VFPCK', 'Kurnool', 'Kuttoor', 'L B Nagar', 'Lalgudi(Uzhavar Sandhai )',
    'Lasalgaon(Niphad)', 'Lasalgaon(Vinchur)', 'Madanapalli',
    'Madhuranthagam(Uzhavar Sandhai )', 'Madikai  VFPCK', 'Mahabubnagar(Rythu Bazar)',
    'Mahboob Manison', 'Mailaduthurai', 'Majalgaon', 'MALA VFPCK',
    'Malayattoor  VFPCK', 'Malkapur', 'Malur', 'Manachanallur(Uzhavar Sandhai )',
    'Manakodur', 'Manapparai(Uzhavar Sandhai )', 'Manathavady', 'Mangal Wedha',
    'Mangalore', 'Mangaon', 'Manjeswaram', 'MANKADA VFPCK', 'Mannackanad  VFPCK',
    'Mannar', 'Mannargudi I(Uzhavar Sandhai )', 'Mannargudi II(Uzhavar Sandhai )',
    'Marottichal  VFPCK', 'Mattannur  VFPCK', 'Mayiladuthurai(Uzhavar Sandhai )',
    'Medavakkam(Uzhavar Sandhai )', 'Mehekar', 'Mehndipatnam(Rythu Bazar)',
    'Melapalayam(Uzhavar Sandhai )', 'Melur(Uzhavar Sandhai )',
    'Mettupalayam(Uzhavar Sandhai )', 'Mettur(Uzhavar Sandhai )',
    'Mezhuveli  VFPCK', 'Miryalaguda', 'Mohanur(Uzhavar Sandhai )',
    'Mookkannur  VFPCK', 'Mukkom', 'Mul', 'Mulabagilu', 'Mulakalacheruvu',
    'Mumbai', 'Mumbai- Fruit Market', 'Murbad', 'Muriyad  VFPCK', 'Murud',
    'Murum', 'Musiri(Uzhavar Sandhai )', 'Muthupettai(Uzhavar Sandhai )',
    'Myladi(Uzhavar Sandhai )', 'Nagapattinam(Uzhavar Sandhai )', 'Nagpur',
    'Namakkal(Uzhavar Sandhai )', 'Nandgaon', 'Nandyal',
    'Nanganallur(Uzhavar Sandhai )', 'Naranganam  VFPCK',
    'Naravarikuppam(Uzhavar Sandhai )', 'Nasik', 'Natrampalli(Uzhavar Sandhai )',
    'Neduvathoor  VFPCK', 'Needamangalam(Uzhavar Sandhai )', 'Neeleswaram',
    'Neredcherla', 'Newasa(Ghodegaon)', 'Neyyatinkara', 'Neyyattinkara  VFPCK',
    'NGO Colony(Uzhavar Sandhai )', 'Nooluvally  VFPCK', 'North Paravur'
  ];

  const crops = [
    'Apple', 'Banana', 'Banana - Green', 'Beetroot', 'Bengal Gram(Gram)(Whole)',
    'Betal Leaves', 'Bhindi(Ladies Finger)', 'Bitter gourd', 'Bottle gourd',
    'Brinjal', 'Cabbage', 'Capsicum', 'Carrot', 'Cauliflower', 'Coconut',
    'Coffee', 'Coriander(Leaves)', 'Cucumbar(Kheera)', 'Drumstick', 'Dry Chillies',
    'French Beans (Frasbean)', 'Garlic', 'Ginger(Green)', 'Grapes', 'Green Chilli',
    'Jack Fruit', 'Lemon', 'Maize', 'Mango', 'Mango (Raw-Ripe)', 'Onion',
    'Paddy(Dhan)(Common)', 'Papaya', 'Pineapple', 'Potato', 'Pumpkin',
    'Ragi (Finger Millet)', 'Rice', 'Rose(Loose))', 'Spinach', 'Sunflower',
    'Tender Coconut', 'Tomato', 'Water Melon', 'Wheat'
  ];

  const filteredDistricts = districts.filter(district =>
    district.toLowerCase().includes(districtSearch.toLowerCase())
  );

  const filteredMarkets = markets.filter(market =>
    market.toLowerCase().includes(marketSearch.toLowerCase())
  );

  const filteredCrops = crops.filter(crop =>
    crop.toLowerCase().includes(cropSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.state && formData.district && formData.market && formData.crops.length > 0) {
      onComplete(formData);
    } else {
      alert('Please fill in all fields and select at least one crop');
    }
  };

  const addCrop = (crop: string) => {
    if (!formData.crops.includes(crop)) {
      setFormData({ ...formData, crops: [...formData.crops, crop] });
    }
    setCropSearch('');
    setShowCropDropdown(false);
  };

  const removeCrop = (cropToRemove: string) => {
    setFormData({
      ...formData,
      crops: formData.crops.filter(crop => crop !== cropToRemove)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">Complete Your Profile</CardTitle>
          <p className="text-gray-600">Help us personalize your farming experience</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="state">State</Label>
              <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                type="text"
                placeholder="Type to search district..."
                value={districtSearch}
                onChange={(e) => {
                  setDistrictSearch(e.target.value);
                  setShowDistrictDropdown(true);
                }}
                onFocus={() => setShowDistrictDropdown(true)}
              />
              {showDistrictDropdown && filteredDistricts.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                  {filteredDistricts.slice(0, 10).map((district) => (
                    <div
                      key={district}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setFormData({ ...formData, district });
                        setDistrictSearch(district);
                        setShowDistrictDropdown(false);
                      }}
                    >
                      {district}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <Label htmlFor="market">Market</Label>
              <Input
                id="market"
                type="text"
                placeholder="Type to search market..."
                value={marketSearch}
                onChange={(e) => {
                  setMarketSearch(e.target.value);
                  setShowMarketDropdown(true);
                }}
                onFocus={() => setShowMarketDropdown(true)}
              />
              {showMarketDropdown && filteredMarkets.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                  {filteredMarkets.slice(0, 10).map((market) => (
                    <div
                      key={market}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setFormData({ ...formData, market });
                        setMarketSearch(market);
                        setShowMarketDropdown(false);
                      }}
                    >
                      {market}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label>Crops You Grow</Label>
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Type to search and add crops..."
                    value={cropSearch}
                    onChange={(e) => {
                      setCropSearch(e.target.value);
                      setShowCropDropdown(true);
                    }}
                    onFocus={() => setShowCropDropdown(true)}
                  />
                  {showCropDropdown && filteredCrops.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                      {filteredCrops.slice(0, 10).map((crop) => (
                        <div
                          key={crop}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => addCrop(crop)}
                        >
                          {crop}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {formData.crops.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.crops.map((crop) => (
                      <div
                        key={crop}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {crop}
                        <button
                          type="button"
                          onClick={() => removeCrop(crop)}
                          className="hover:bg-green-200 rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-green-700">
              Complete Setup
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyPage;
