export interface Partner {
  id: string;
  name: string;
  phone: string[];
  momoPhone?: string;
  locations: string[];
  region: string;
}

export interface Region {
  id: string;
  name: string;
  isCity?: boolean;
  parentRegion?: string;
}

export const regions: Region[] = [
  { id: "greater-accra", name: "Greater Accra Region" },
  { id: "tema", name: "Tema", isCity: true, parentRegion: "greater-accra" },
  { id: "central", name: "Central Region" },
  { id: "kasoa", name: "Kasoa", isCity: true, parentRegion: "central" },
  { id: "ashanti", name: "Ashanti Region" },
  { id: "bono-east", name: "Bono East Region" },
  { id: "bono", name: "Bono Region" },
  { id: "western-north", name: "Western North Region" },
  { id: "western", name: "Western Region" },
  { id: "eastern", name: "Eastern Region" },
  { id: "northern", name: "Northern Region" },
  { id: "volta", name: "Volta Region" },
];

export const partners: Partner[] = [
  // Greater Accra Region
  { id: "p1", name: "Adwoa Konadu", phone: ["0208959898"], locations: ["Ablekuma Olebu"], region: "greater-accra" },
  { id: "p2", name: "Thess", phone: ["0530184098"], locations: ["Madina"], region: "greater-accra" },
  { id: "p3", name: "Jessica", phone: ["0553287428"], locations: ["Ablekuma"], region: "greater-accra" },
  { id: "p4", name: "Ruth Dodowa", phone: ["0530184098"], locations: ["Madina"], region: "greater-accra" },
  { id: "p5", name: "Ajoh", phone: ["0246959438"], locations: ["Dzorwulu"], region: "greater-accra" },
  { id: "p6", name: "Leen Dome", phone: ["0595191518"], locations: ["Ashorg"], region: "greater-accra" },
  { id: "p7", name: "Valerie", phone: ["0550937098"], locations: ["Ablekuma Joma"], region: "greater-accra" },
  { id: "p8", name: "Nana Yeboah", phone: ["0244867787"], locations: ["Abokobi"], region: "greater-accra" },
  { id: "p9", name: "Blacklove", phone: ["0504989122"], locations: ["Spintex", "Lashibi", "Teshie"], region: "greater-accra" },
  { id: "p10", name: "Pep", phone: ["0544689863"], locations: ["Awoshie"], region: "greater-accra" },
  { id: "p11", name: "Nana Yaa", phone: ["0248204384"], locations: ["Kaneshie"], region: "greater-accra" },
  { id: "p12", name: "Estees", phone: ["0246867009"], locations: ["37", "Burma Camp", "Cantonments"], region: "greater-accra" },
  { id: "p13", name: "Sampson Armoo", phone: ["0544657874"], locations: ["Odorkor", "Darkuman"], region: "greater-accra" },
  { id: "p14", name: "KTee", phone: ["0248314765"], locations: ["Lapaz"], region: "greater-accra" },
  { id: "p15", name: "Judy", phone: ["0246230300", "0545561662"], locations: ["Mallam", "Gbawe"], region: "greater-accra" },
  { id: "p16", name: "Tilly", phone: ["0540501872"], locations: ["Weija", "Scc"], region: "greater-accra" },

  // Tema
  { id: "p17", name: "Peddy", phone: ["0248001159"], locations: ["Community 25"], region: "tema" },
  { id: "p18", name: "Gladys Nyame", phone: ["0240246165", "0267037734"], momoPhone: "0240246165", locations: ["Tema Communities", "Tema Newtown"], region: "tema" },
  { id: "p19", name: "Regina Sedoh", phone: ["0548273170"], locations: ["Ashaiman", "Lebanon", "Zenu", "Atadeka", "Newyork", "Washington", "Katamanso", "Apolonia", "PeaceLand", "Aviation"], region: "tema" },
  { id: "p20", name: "AdwoaLyn", phone: ["0553962747", "0257159449"], momoPhone: "0257159449", locations: ["Ashaiman-Afienya", "C22"], region: "tema" },

  // Central Region
  { id: "p21", name: "Tina", phone: ["0203158693"], locations: ["Agona Swedru"], region: "central" },
  { id: "p22", name: "Alisco", phone: ["0242185824"], locations: ["Apam", "Winneba"], region: "central" },
  { id: "p23", name: "Justina", phone: ["0249210659"], locations: ["Agona Swedru"], region: "central" },
  { id: "p24", name: "Benfot Pharmacy", phone: ["0246396869"], locations: ["Agona Swedru"], region: "central" },
  { id: "p25", name: "Wafesco Cosmetics", phone: ["0240553323"], locations: ["Agona Swedru"], region: "central" },
  { id: "p26", name: "Mbroh", phone: ["0599732764"], locations: ["Agona Swedru"], region: "central" },
  { id: "p27", name: "Gifty", phone: ["0243788859"], locations: ["Mankessim"], region: "central" },
  { id: "p28", name: "V's Closet", phone: ["0593560248"], locations: ["Twifo Praso"], region: "central" },
  { id: "p29", name: "Sakina", phone: ["0246480265"], locations: ["Mankessim"], region: "central" },
  { id: "p30", name: "Midwife Anas", phone: ["0244029744"], locations: ["Assin Fosu"], region: "central" },
  { id: "p31", name: "Ohemaa", phone: ["0550265877"], locations: ["Cape Coast"], region: "central" },

  // Kasoa
  { id: "p32", name: "Tilly", phone: ["0540501872"], locations: ["Kasoa"], region: "kasoa" },
  { id: "p33", name: "Tabitha Mizpah", phone: ["0249496872"], locations: ["Kasoa Liberia Camp", "Tuba", "Nyanyano", "Amanfrom", "Opeikuma", "Fetteh Kakraba"], region: "kasoa" },

  // Ashanti Region
  { id: "p34", name: "Rosina", phone: ["0544855670"], locations: ["Bremang"], region: "ashanti" },
  { id: "p35", name: "Estella", phone: ["0598738884"], locations: ["Sokoban"], region: "ashanti" },
  { id: "p36", name: "Nana Achiaa Adepa", phone: ["0553121649"], locations: ["Atonsu Area"], region: "ashanti" },
  { id: "p37", name: "Opoku Sandra", phone: ["0596760694"], locations: ["Offinso"], region: "ashanti" },
  { id: "p38", name: "Mina Hamid", phone: ["0246679354"], locations: ["Nkawie"], region: "ashanti" },
  { id: "p39", name: "Evelyn Boakyewah", phone: ["0541532222"], locations: ["Mamponteng"], region: "ashanti" },
  { id: "p40", name: "Doreen", phone: ["0599844152"], locations: ["Agona"], region: "ashanti" },
  { id: "p41", name: "Anabel", phone: ["0203118038"], locations: ["Kotwi"], region: "ashanti" },
  { id: "p42", name: "Nana Akua", phone: ["0245392018"], locations: ["Tech Campus"], region: "ashanti" },
  { id: "p43", name: "Miss Lina", phone: ["0550297681"], locations: ["Mampong"], region: "ashanti" },
  { id: "p44", name: "Nana Akua", phone: ["0242706587"], locations: ["Ejisu"], region: "ashanti" },
  { id: "p45", name: "Debbie", phone: ["0597539152"], locations: ["Kejetia"], region: "ashanti" },
  { id: "p46", name: "Mama Esther", phone: ["0244824412"], locations: ["IPT"], region: "ashanti" },
  { id: "p47", name: "Abyna Franca", phone: ["0598184775"], locations: ["Agric"], region: "ashanti" },
  { id: "p48", name: "Big Dwomoh", phone: ["0592945238"], locations: ["Aboaso"], region: "ashanti" },
  { id: "p49", name: "Ellen", phone: ["0551561808"], locations: ["Kenyase"], region: "ashanti" },
  { id: "p50", name: "Sandra", phone: ["0554829533"], locations: ["Obuasi"], region: "ashanti" },

  // Bono East Region
  { id: "p51", name: "Mary", phone: ["0546400948"], locations: ["Techiman"], region: "bono-east" },
  { id: "p52", name: "Helena", phone: ["0242188794"], locations: ["Techiman"], region: "bono-east" },

  // Bono Region
  { id: "p53", name: "Smart and Bold", phone: ["0547710639"], locations: ["Sunyani"], region: "bono" },

  // Western North Region
  { id: "p54", name: "Ohemaa", phone: ["0547366222"], locations: ["Enchi"], region: "western-north" },
  { id: "p55", name: "Martha", phone: ["0595805064"], locations: ["Asankraguaa"], region: "western-north" },
  { id: "p56", name: "Abigail", phone: ["0245691573"], locations: ["Sefwi"], region: "western-north" },
  { id: "p57", name: "Tricia", phone: ["0545002786"], locations: ["Bibiani"], region: "western-north" },

  // Western Region
  { id: "p58", name: "Naa Shika", phone: ["0241238392"], locations: ["Takoradi"], region: "western" },
  { id: "p59", name: "Cookies", phone: ["0245336077"], locations: ["Takoradi"], region: "western" },
  { id: "p60", name: "Sandy", phone: ["0532330504"], locations: ["Bogoso"], region: "western" },
  { id: "p61", name: "Vybshair Plug", phone: ["0532622357"], locations: ["Tarkwa"], region: "western" },

  // Eastern Region
  { id: "p62", name: "Bene Hooper", phone: ["0244356886"], locations: ["Koforidua"], region: "eastern" },
  { id: "p63", name: "Faustina Abena Boateng", phone: ["0248799300"], locations: ["Nkawkaw"], region: "eastern" },
  { id: "p64", name: "Nana Ama Mantebea", phone: ["0249799789"], locations: ["Nsawam"], region: "eastern" },
  { id: "p65", name: "Amponsah Gifty", phone: ["0553238409"], locations: ["Koforidua"], region: "eastern" },

  // Northern Region
  { id: "p66", name: "Angela", phone: ["0542354959"], locations: ["Tamale"], region: "northern" },

  // Volta Region
  { id: "p67", name: "Ama Gold", phone: ["0548342996"], locations: ["Ho"], region: "volta" },
  { id: "p68", name: "Adepa", phone: ["0245713291"], locations: ["Aflao"], region: "volta" },
];

export const WHATSAPP_NUMBER = "233554753634";

export const getPartnerApplicationWhatsAppLink = (formData: {
  name: string;
  phone: string;
  location: string;
  region: string;
}) => {
  const message = encodeURIComponent(
    `Hello Nuni Global! I'd like to become a partner.\n\n` +
    `Name: ${formData.name}\n` +
    `Phone: ${formData.phone}\n` +
    `Location: ${formData.location}\n` +
    `Region: ${formData.region}\n\n` +
    `Please contact me with more information about the partnership opportunity.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};
