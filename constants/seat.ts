import { districts, division_districts, divisions } from "./data";

const Panchagarh_1 = ["Panchagarh_1_1", "Panchagarh_1_2", "Panchagarh_1_3"];
const Panchagarh_2 = ["Panchagarh_2_1", "Panchagarh_2_2"];
const Panchagarh = [Panchagarh_1, Panchagarh_2];

const Thakurgaon_1 = ["Thakurgaon_1_1"];
const Thakurgaon_2 = ["Thakurgaon_2_1", "Thakurgaon_2_2"];
const Thakurgaon_3 = ["Thakurgaon_3_1", "Thakurgaon_3_2"];
const Thakurgaon = [Thakurgaon_1, Thakurgaon_2, Thakurgaon_3];


const Dinajpur_1 = ["Dinajpur_1_1", "Dinajpur_1_2"];
const Dinajpur_2 = ["Dinajpur_2_1", "Dinajpur_2_2"];
const Dinajpur_3 = ["Dinajpur_3_1"];
const Dinajpur_4 = ["Dinajpur_4_1", "Dinajpur_4_2"];
const Dinajpur_5 = ["Dinajpur_5_1", "Dinajpur_5_2"];
const Dinajpur_6 = ["Dinajpur_6_1", "Dinajpur_6_2", "Dinajpur_6_3", "Dinajpur_6_4"];
const Dinajpur = [Dinajpur_1, Dinajpur_2, Dinajpur_3, Dinajpur_4, Dinajpur_5, Dinajpur_6];

const Nilphamari_1 = ["Nilphamari_1_1", "Nilphamari_1_2"];
const Nilphamari_2 = ["Nilphamari_2_1"];
const Nilphamari_3 = ["Nilphamari_3_1"];
const Nilphamari_4 = ["Nilphamari_4_1", "Nilphamari_4_2"];
const Nilphamari = [Nilphamari_1, Nilphamari_2, Nilphamari_3, Nilphamari_4];

const Lalmonirhat_1 = ["Lalmonirhat_1_1", "Lalmonirhat_1_2"];
const Lalmonirhat_2 = ["Lalmonirhat_2_1", "Lalmonirhat_2_2"];
const Lalmonirhat_3 = ["Lalmonirhat_3_1"];
const Lalmonirhat = [Lalmonirhat_1, Lalmonirhat_2, Lalmonirhat_3];


const Rangpur_1 = ["Rangpur_1_1"];
const Rangpur_2 = ["Rangpur_2_1", "Rangpur_2_2"];
const Rangpur_3 = ["Rangpur_3_1"];
const Rangpur_4 = ["Rangpur_4_1", "Rangpur_4_2"];
const Rangpur_5 = ["Rangpur_5_1"];
const Rangpur_6 = ["Rangpur_6_1"];
const Rangpur = [Rangpur_1, Rangpur_2, Rangpur_3, Rangpur_4, Rangpur_5, Rangpur_6];

const Kurigram_1 = ["Kurigram_1_1", "Kurigram_1_2"];
const Kurigram_2 = ["Kurigram_2_1", "Kurigram_2_2", "Kurigram_2_3"];
const Kurigram_3 = ["Kurigram_3_1"];
const Kurigram_4 = ["Kurigram_4_1", "Kurigram_4_2", "Kurigram_4_3"];
const Kurigram = [Kurigram_1, Kurigram_2, Kurigram_3, Kurigram_4];

const Gaibandha_1 = ["Gaibandha_1_1"];
const Gaibandha_2 = ["Gaibandha_2_1"];
const Gaibandha_3 = ["Gaibandha_3_1", "Gaibandha_3_2"];
const Gaibandha_4 = ["Gaibandha_4_1"];
const Gaibandha_5 = ["Gaibandha_5_1", "Gaibandha_5_2"];
const Gaibandha = [Gaibandha_1, Gaibandha_2, Gaibandha_3, Gaibandha_4, Gaibandha_5];

// ----------------- RAJSHAHI DIVISION ------------------ //

const Joypurhat_1 = ["Joypurhat_1_1", "Joypurhat_1_2"];
const Joypurhat_2 = ["Joypurhat_2_1", "Joypurhat_2_2", "Joypurhat_2_3"];
const Joypurhat = [Joypurhat_1, Joypurhat_2];

const Bogra_1 = ["Bogra_1_1", "Bogra_1_2"];
const Bogra_2 = ["Bogra_2_1"];
const Bogra_3 = ["Bogra_3_1", "Bogra_3_2"];
const Bogra_4 = ["Bogra_4_1", "Bogra_4_2"];
const Bogra_5 = ["Bogra_5_1", "Bogra_5_2"];
const Bogra_6 = ["Bogra_6_1"];
const Bogra_7 = ["Bogra_7_1", "Bogra_7_2"];
const Bogra = [Bogra_1, Bogra_2, Bogra_3, Bogra_4, Bogra_5, Bogra_6, Bogra_7];

const Chapainawabganj_1 = ["Chapainawabganj_1_1"];
const Chapainawabganj_2 = ["Chapainawabganj_2_1", "Chapainawabganj_2_2", "Chapainawabganj_2_3"];
const Chapainawabganj_3 = ["Chapainawabganj_3_1"];
const Chapainawabganj = [Chapainawabganj_1, Chapainawabganj_2, Chapainawabganj_3];

const Naogaon_1 = ["Naogaon_1_1", "Naogaon_1_2", "Naogaon_3_3"];
const Naogaon_2 = ["Naogaon_2_1", "Naogaon_2_2"];
const Naogaon_3 = ["Naogaon_3_1", "Naogaon_3_2"];
const Naogaon_4 = ["Naogaon_4_1"];
const Naogaon_5 = ["Naogaon_5_1"];
const Naogaon_6 = ["Naogaon_6_1", "Naogaon_6_2"];
const Naogaon = [Naogaon_1, Naogaon_2, Naogaon_3, Naogaon_4, Naogaon_5, Naogaon_6];

const Rajshahi_1 = ["Rajshahi_1_1", "Rajshahi_1_2"];
const Rajshahi_2 = ["Rajshahi_2_1"];
const Rajshahi_3 = ["Rajshahi_3_1", "Rajshahi_3_2"];
const Rajshahi_4 = ["Rajshahi_4_1"];
const Rajshahi_5 = ["Rajshahi_5_1", "Rajshahi_5_2"];
const Rajshahi_6 = ["Rajshahi_6_1", "Rajshahi_6_2"];
const Rajshahi = [Rajshahi_1, Rajshahi_2, Rajshahi_3, Rajshahi_4, Rajshahi_5, Rajshahi_6];

const Natore_1 = ["Natore_1_1", "Natore_1_2"];
const Natore_2 = ["Natore_2_1", "Natore_2_2"];
const Natore_3 = ["Natore_3_1"];
const Natore_4 = ["Natore_4_1", "Natore_4_2"];
const Natore = [Natore_1, Natore_2, Natore_3, Natore_4];

const Sirajganj_1 = ["Sirajganj_1_1"];
const Sirajganj_2 = ["Sirajganj_2_1", "Sirajganj_2_2"];
const Sirajganj_3 = ["Sirajganj_3_1", "Sirajganj_3_2"];
const Sirajganj_4 = ["Sirajganj_4_1"];
const Sirajganj_5 = ["Sirajganj_5_1", "Sirajganj_5_2"];
const Sirajganj_6 = ["Sirajganj_6_1"];
const Sirajganj = [Sirajganj_1, Sirajganj_2, Sirajganj_3, Sirajganj_4, Sirajganj_5, Sirajganj_6];


const Pabna_1 = ["Pabna_1_1", "Pabna_1_2"];
const Pabna_2 = ["Pabna_2_1", "Pabna_2_2"];
const Pabna_3 = ["Pabna_3_1", "Pabna_3_2"];
const Pabna_4 = ["Pabna_4_1", "Pabna_4_2"];
const Pabna_5 = ["Pabna_5_1"];
const Pabna = [Pabna_1, Pabna_2, Pabna_3, Pabna_4, Pabna_5];


// ----------------- KHULNA DIVISION ------------------ //

const Meherpur_1 = ["Meherpur_1_1", "Meherpur_1_2"];
const Meherpur_2 = ["Meherpur_2_1"];
const Meherpur = [Meherpur_1, Meherpur_2];

const Kushtia_1 = ["Kushtia_1_1"];
const Kushtia_2 = ["Kushtia_2_1", "Kushtia_2_2"];
const Kushtia_3 = ["Kushtia_3_1"];
const Kushtia_4 = ["Kushtia_4_1", "Kushtia_4_2"];
const Kushtia = [Kushtia_1, Kushtia_2, Kushtia_3, Kushtia_4];

const Chuadanga_1 = ["Chuadanga_1_1", "Chuadanga_1_2"];
const Chuadanga_2 = ["Chuadanga_2_1", "Chuadanga_2_2"];
const Chuadanga = [Chuadanga_1, Chuadanga_2];

const Jhenaidah_1 = ["Jhenaidah_1_1"]
const Jhenaidah_2 = ["Jhenaidah_2_2", "Jhenaidah_2_2"];
const Jhenaidah_3 = ["Jhenaidah_3_1", "Jhenaidah_3_2"];
const Jhenaidah_4 = ["Jhenaidah_4_1"];
const Jhenaidah = [Jhenaidah_1, Jhenaidah_2, Jhenaidah_3, Jhenaidah_4];

const Jessore_1 = ["Jessore_1_1"];
const Jessore_2 = ["Jessore_2_1", "Jessore_2_2"];
const Jessore_3 = ["Jessore_3_1"];
const Jessore_4 = ["Jessore_4_1"];
const Jessore_5 = ["Jessore_5_1"];
const Jessore_6 = ["Jessore_6_1", "Jessore_6_2"];
const Jessore = [Jessore_1, Jessore_2, Jessore_3, Jessore_4, Jessore_5, Jessore_6];

const Magura_1 = ["Magura_1_1", "Magura_1_2"];
const Magura_2 = ["Magura_2_1", "Magura_2_2"];
const Magura = [Magura_1, Magura_2];

const Narail_1 = ["Narail_1_1"];
const Narail_2 = ["Narail_2_1", "Narail_2_2"];
const Narail = [Narail_1, Narail_2];

const Khulna_1 = ["khulna_1_1", "khulna_1_2", "khulna_1_3", "khulna_1_4", "khulna_1_5", "khulna_1_6", "khulna_1_7", "khulna_1_8", "khulna_1_9", "khulna_1_10"];
const Khulna = [Khulna_1];


const Bagerhat_1 = ["Bagerhat_1_1", "Bagerhat_1_2", "Bagerhat_1_3"];
const Bagerhat_2 = ["Bagherhat_2_1"];
const Bagerhat_3 = ["Bagherhat_3_1"];
const Bagerhat_4 = ["Bagherhat_4_2"];
const Bagerhat_5 = ["Bagherhat_5_1", "Bagherhat_5_2"];
const Bagerhat_6 = ["Bagherhat_6_1"];
const Bagerhat = [Bagerhat_1, Bagerhat_2, Bagerhat_3, Bagerhat_4, Bagerhat_5, Bagerhat_6];

const Satkhira_1 = ["Satkhira_1_1", "Satkhira_1_2"];
const Satkhira_2 = ["Satkhira_2_1"];
const Satkhira_3 = ["Satkhira_3_1", "Satkhira_3_2", "Satkhira_3_3"];
const Satkhira_4 = ["Satkhira_4_1"];
const Satkhira = [Satkhira_1, Satkhira_2, Satkhira_3, Satkhira_4];

// ----------------- DHAKA DIVISION ------------------ //

const Tangail_1 = ["Tangail_1_1", "Tangail_1_2"];
const Tangail_2 = ["Tangail_2_1", "Tangail_2_2"];
const Tangail_3 = ["Tangail_3_1"];
const Tangail_4 = ["Tangail_4_1"];
const Tangail_5 = ["Tangail_5_1"];
const Tangail_6 = ["Tangail_6_1", "Tangail_6_2"];
const Tangail_7 = ["Tangail_7_1"];
const Tangail_8 = ["Tangail_8_1", "Tangail_8_2"];
const Tangail = [Tangail_1, Tangail_2, Tangail_3, Tangail_4, Tangail_5, Tangail_6, Tangail_7, Tangail_8];

const Kishorganj_1 = ["Kishorganj_1_1", "Kishorganj_1_2"];
const Kishorganj_2 = ["Kishorganj_2_1", "Kishorganj_2_2"];
const Kishorganj_3 = ["Kishorganj_3_1", "Kishorganj_3_2"];
const Kishorganj_4 = ["Kishorganj_4_1", "Kishorganj_4_2", "Kishorganj_4_3"];
const Kishorganj_5 = ["Kishorganj_5_1", "Kishorganj_5_2"];
const Kishorganj_6 = ["Kishorganj_6_1", "Kishorganj_6_2"];
const Kishorganj = [Kishorganj_1, Kishorganj_2, Kishorganj_3, Kishorganj_4, Kishorganj_5, Kishorganj_6];

const Manikganj_1 = ["Manikganj_1_1", "Manikganj_1_2", "Manikganj_1_3"];
const Manikganj_2 = ["Manikganj_2_1", "Manikganj_2_2"];
const Manikganj_3 = ["Manikganj_3_1", "Manikganj_3_2"];
const Manikganj = [Manikganj_1, Manikganj_2, Manikganj_3];

const Munshiganj_1 = ["Munshiganj_1_1", "Munshiganj_1_2"];
const Munshiganj_2 = ["Munshiganj_2_1"];
const Munshiganj_3 = ["Munshiganj_3_1", "Munshiganj_3_2"];
const Munshiganj = [Munshiganj_1, Munshiganj_2, Munshiganj_3];

const Dhaka_1 = ["Dhaka_1_1", "Dhaka_1_2"];
const Dhaka_2 = ["polygon1217"];
const Dhaka_3 = ["polygon1217"];
const Dhaka_4 = ["polygon1935"];
const Dhaka_5 = ["polygon1935"];
const Dhaka_6 = ["polygon1935"];
const Dhaka_7 = ["polygon1935"];
const Dhaka_8 = ["polygon1935"];
const Dhaka_9 = ["polygon1935"];
const Dhaka_10 = ["polygon1935"];
const Dhaka_11 = ["polygon1935"];
const Dhaka_12 = ["polygon1935"];
const Dhaka_13 = ["polygon1935"];
const Dhaka_14 = ["polygon1935"];
const Dhaka_15 = ["polygon1935"];
const Dhaka_16 = ["polygon1935"];
const Dhaka_17 = ["polygon1935"];
const Dhaka_18 = ["polygon1935"];
const Dhaka_19 = ["Dhaka_19_1"];
const Dhaka_20 = ["Dhaka_20_1"];
const Dhaka = [Dhaka_1, Dhaka_2, Dhaka_3, Dhaka_4, Dhaka_5, Dhaka_6, Dhaka_7, Dhaka_8, Dhaka_9, Dhaka_10, Dhaka_11, Dhaka_12, Dhaka_13, Dhaka_14, Dhaka_15, Dhaka_16, Dhaka_17, Dhaka_18, Dhaka_19, Dhaka_20];

const Gazipur_1 = ["Gazipur_1_1"];
const Gazipur_2 = ["Gazipur_2_1"];
const Gazipur_3 = ["Gazipur_3_1"];
const Gazipur_4 = ["Gazipur_4_1"];
const Gazipur_5 = ["Gazipur_5_1"];
const Gazipur = [Gazipur_1, Gazipur_2, Gazipur_3, Gazipur_4, Gazipur_5];

const Narsingdi_1 = ["Narsingdi_1_1"];
const Narsingdi_2 = ["Narsingdi_2_1"];
const Narsingdi_3 = ["Narsingdi_3_1"];
const Narsingdi_4 = ["Narsingdi_4_1", "Narsingdi_4_2"];
const Narsingdi_5 = ["Narsingdi_5_1"];
const Narsingdi = [Narsingdi_1, Narsingdi_2, Narsingdi_3, Narsingdi_4, Narsingdi_5];

const Narayanganj_1 = ["Narayanganj_1_1"];
const Narayanganj_2 = ["Narayanganj_2_1"];
const Narayanganj_3 = ["Narayanganj_3_1"];
const Narayanganj_4 = ["Narayanganj_4_1"];
const Narayanganj_5 = ["Narayanganj_5_1"];
const Narayanganj = [Narayanganj_1, Narayanganj_2, Narayanganj_3, Narayanganj_4, Narayanganj_5];

const Rajbari_1 = ["Rajbari_1_1", "Rajbari_1_2"];
const Rajbari_2 = ["Rajbari_2_1", "Rajbari_2_2", "Rajbari_2_3"];
const Rajbari = [Rajbari_1, Rajbari_2];

const Faridpur_1 = ["Faridpur_1_1", "Faridpur_1_2", "Faridpur_1_3"];
const Faridpur_2 = ["Faridpur_2_1", "Faridpur_2_2"];
const Faridpur_3 = ["Faridpur_3_1"];
const Faridpur_4 = ["Faridpur_4_1", "Faridpur_4_2", "Faridpur_4_3"];
const Faridpur = [Faridpur_1, Faridpur_2, Faridpur_3, Faridpur_4];

const Gopalganj_1 = ["Gopalganj_1_1", "Gopalganj_1_2"];
const Gopalganj_2 = ["Gopalganj_2_1"];
const Gopalganj_3 = ["Gopalganj_3_1", "Gopalganj_3_2"];
const Gopalganj = [Gopalganj_1, Gopalganj_2, Gopalganj_3];

const Madaripur_1 = ["Madaripur_1_1"];
const Madaripur_2 = ["Madaripur_2_1", "Madaripur_2_2"];
const Madaripur_3 = ["Madaripur_3_1", "Madaripur_3_2"];
const Madaripur = [Madaripur_1, Madaripur_2, Madaripur_3];

const Shariatpur_1 = ["Shariatpur_1_1", "Shariatpur_1_2"];
const Shariatpur_2 = ["Shariatpur_2_1", "Shariatpur_2_2"];
const Shariatpur_3 = ["Shariatpur_3_1", "Shariatpur_3_2"];
const Shariatpur = [Shariatpur_1, Shariatpur_2, Shariatpur_3];

// ----------------- MYMENSINGH DIVISION ------------------ //

const Jamalpur_1 = ["Jamalpur_1_1", "Jamalpur_1_2"];
const Jamalpur_2 = ["Jamalpur_2_1"];
const Jamalpur_3 = ["Jamalpur_3_1", "Jamalpur_3_2"];
const Jamalpur_4 = ["Jamalpur_4_1"];
const Jamalpur_5 = ["Jamalpur_5_1"];
const Jamalpur = [Jamalpur_1, Jamalpur_2, Jamalpur_3, Jamalpur_4, Jamalpur_5];

const Sherpur_1 = ["Sherpur_1_1", "Sherpur_1_2"];
const Sherpur_2 = ["Sherpur_2_1"];
const Sherpur_3 = ["Sherpur_3_1", "Sherpur_3_2"];
const Sherpur = [Sherpur_1, Sherpur_2, Sherpur_3];

const Mymensingh_1 = ["Mymensingh_1_1", "Mymensingh_1_2"];
const Mymensingh_2 = ["Mymensingh_2_1", "Mymensingh_2_2"];
const Mymensingh_3 = ["Mymensingh_3_1", "Mymensingh_2_2"];
const Mymensingh_4 = ["Mymensingh_4_1"];
const Mymensingh_5 = ["Mymensingh_5_1"];
const Mymensingh_6 = ["Mymensingh_6_1"];
const Mymensingh_7 = ["Mymensingh_7_1"];
const Mymensingh_8 = ["Mymensingh_8_1"];
const Mymensingh_9 = ["Mymensingh_9_1"];
const Mymensingh_10 = ["Mymensingh_10_1"];
const Mymensingh_11 = ["Mymensingh_11_1"];
const Mymensingh = [Mymensingh_1, Mymensingh_2, Mymensingh_3, Mymensingh_4, Mymensingh_5, Mymensingh_6, Mymensingh_7, Mymensingh_8, Mymensingh_9, Mymensingh_10, Mymensingh_11];

const Netrokona_1 = ["Netrokona_1_1", "Netrokona_1_2"];
const Netrokona_2 = ["Netrokona_2_1", "Netrokona_2_2"];
const Netrokona_3 = ["Netrokona_3_1", "Netrokona_3_1"];
const Netrokona_4 = ["Netrokona_4_1", "Netrokona_4_2"];
const Netrokona_5 = ["Netrokona_5_1"];
const Netrokona = [Netrokona_1, Netrokona_2, Netrokona_3, Netrokona_4, Netrokona_5];

// ----------------- CHITTAGONG DIVISION ------------------ //

const Brahmanbaria_1 = ["Brahmanbaria_1_1"];
const Brahmanbaria_2 = ["Brahmanbaria_2_1", "Brahmanbaria_2_2"];
const Brahmanbaria_3 = ["Brahmanbaria_3_1", "Brahmanbaria_3_2"];
const Brahmanbaria_4 = ["Brahmanbaria_4_1", "Brahmanbaria_4_2"];
const Brahmanbaria_5 = ["Brahmanbaria_5_1"];
const Brahmanbaria_6 = ["Brahmanbaria_6_1"];
const Brahmanbaria = [Brahmanbaria_1, Brahmanbaria_2, Brahmanbaria_3, Brahmanbaria_4, Brahmanbaria_5, Brahmanbaria_6];

const Comilla_1 = ["Comilla_1_1", "Comilla_1_2"];
const Comilla_2 = ["Comilla_2_1", "Comilla_2_2"];
const Comilla_3 = ["Comilla_3_1"];
const Comilla_4 = ["Comilla_4_1"];
const Comilla_5 = ["Comilla_5_1", "Comilla_5_2"];
const Comilla_6 = ["Comilla_6_1"];
const Comilla_7 = ["Comilla_7_1"];
const Comilla_8 = ["Comilla_8_1", "Comilla_8_2"];
const Comilla_9 = ["Comilla_9_1", "Comilla_9_2"];
const Comilla_10 = ["Comilla_10_1", "Comilla_10_2"];
const Comilla_11 = ["Comilla_11_1"];
const Comilla = [Comilla_1, Comilla_2, Comilla_3, Comilla_4, Comilla_5, Comilla_6, Comilla_7, Comilla_8, Comilla_9, Comilla_10, Comilla_11];

const Chandpur_1 = ["Chandpur_1_1"];
const Chandpur_2 = ["Chandpur_2_1", "Chandpur_2_2"];
const Chandpur_3 = ["Chandpur_3_1", "Chandpur_3_2"];
const Chandpur_4 = ["Chandpur_4_1"];
const Chandpur_5 = ["Chandpur_5_1", "Chandpur_5_2"];
const Chandpur = [Chandpur_1, Chandpur_2, Chandpur_3, Chandpur_4, Chandpur_5];

const Feni_1 = ["Feni_1_1", "Feni_1_2", "Feni_1_3"];
const Feni_2 = ["Feni_2_1"];
const Feni_3 = ["Feni_3_1", "Feni_3_2"];
const Feni = [Feni_1, Feni_2, Feni_3];


const Noakhali_1 = ["Noakhali_1_1", "Noakhali_1_2"];
const Noakhali_2 = ["Noakhali_2_1"];
const Noakhali_3 = ["Noakhali_3_1"];
const Noakhali_4 = ["Noakhali_4_1"];
const Noakhali_5 = ["Noakhali_5_1", "Noakhali_5_2"];
const Noakhali_6 = ["Noakhali_4_1", "Noakhali_6_1", "Noakhali_6_2", "Noakhali_6_3", "Noakhali_6_4"];
const Noakhali = [Noakhali_1, Noakhali_2, Noakhali_3, Noakhali_4, Noakhali_5, Noakhali_6];

const Laxmipur_1 = ["Laxmipur_1_1"];
const Laxmipur_2 = ["Laxmipur_2_1"];
const Laxmipur_3 = ["Laxmipur_3_1"];
const Laxmipur_4 = ["Laxmipur_4_1", "Laxmipur_4_2", "Laxmipur_4_3"];
const Laxmipur = [Laxmipur_1, Laxmipur_2, Laxmipur_3, Laxmipur_4];

const Chittagong_1 = ["Chittagong_1_1"];
const Chittagong_2 = ["Chittagong_2_1"];
const Chittagong_3 = ["Chittagong_3_1"];
const Chittagong_4 = ["Chittagong_4_1"];
const Chittagong_5 = ["Chittagong_5_1"];
const Chittagong_6 = ["Chittagong_6_1"];
const Chittagong_7 = ["Chittagong_7_1"];
const Chittagong_8 = ["Chittagong_8_1"];
const Chittagong_9 = ["Chittagong_9_1"];
const Chittagong_10 = ["Chittagong_11_1"];
const Chittagong_11 = ["Chittagong_11_1"];
const Chittagong_12 = ["Chittagong_12_1"];
const Chittagong_13 = ["Chittagong_13_1"];
const Chittagong_14 = ["Chittagong_14_1"];
const Chittagong_15 = ["Chittagong_15_1", "Chittagong_15_2"];
const Chittagong_16 = ["Chittagong_16_1"];
const Chittagong = [Chittagong_1, Chittagong_2, Chittagong_3, Chittagong_4, Chittagong_5, Chittagong_6, Chittagong_7, Chittagong_8, Chittagong_9, Chittagong_10, Chittagong_11, Chittagong_12, Chittagong_13, Chittagong_14, Chittagong_15, Chittagong_16];


const CoxsBazar_1 = ["CoxsBazar_1_1", "CoxsBazar_1_2"];
const CoxsBazar_2 = ["CoxsBazar_2_1", "CoxsBazar_2_2"];
const CoxsBazar_3 = ["CoxsBazar_3_1", "CoxsBazar_3_2", "CoxsBazar_3_3"];
const CoxsBazar_4 = ["CoxsBazar_4_1", "CoxsBazar_4_2"];
const CoxsBazar = [CoxsBazar_1, CoxsBazar_2, CoxsBazar_3, CoxsBazar_4];

const Khagrachari_1 = ["Khagrachari_1_1", "Khagrachari_1_2", "Khagrachari_1_3", "Khagrachari_1_4", "Khagrachari_1_5", "Khagrachari_1_6", "Khagrachari_1_7", "Khagrachari_1_8"];
const Khagrachari = [Khagrachari_1];

const Rangamati_1 = ["Rangamati_1_1", "Rangamati_1_2", "Rangamati_1_3", "Rangamati_1_4", "Rangamati_1_5", "Rangamati_1_6", "Rangamati_1_7", "Rangamati_1_8", "Rangamati_1_9", "Rangamati_1_10"];
const Rangamati = [Rangamati_1];

const Bandarban_1 = ["Bandarban_1_1", "Bandarban_1_2", "Bandarban_1_3", "Bandarban_1_4", "Bandarban_1_5", "Bandarban_1_6", "Bandarban_1_7"];
const Bandarban = [Bandarban_1];

// ----------------- Barishal DIVISION ------------------ //

const Barguna_1 = ["Barguna_1_1", "Barguna_1_2", "Barguna_1_3"];
const Barguna_2 = ["Barguna_2_1", "Barguna_2_2", "Barguna_2_3"];
const Barguna = [Barguna_1, Barguna_2];

const Patuakhali_1 = ["Patuakhali_1_1", "Patuakhali_1_2", "Patuakhali_1_3"];
const Patuakhali_2 = ["Patuakhali_2_1"];
const Patuakhali_3 = ["Patuakhali_3_1", "Patuakhali_3_2"];
const Patuakhali_4 = ["Patuakhali_4_1", "Patuakhali_4_2"];
const Patuakhali = [Patuakhali_1, Patuakhali_2, Patuakhali_3, Patuakhali_4];

const Bhola_1 = ["Bhola_1_1"];
const Bhola_2 = ["Bhola_2_1", "Bhola_2_2"];
const Bhola_3 = ["Bhola_3_1", "Bhola_3_2"];
const Bhola_4 = ["Bhola_4_1"];
const Bhola = [Bhola_1, Bhola_2, Bhola_3, Bhola_4];

const Barishal_1 = ["Barishal_1_1", "Barishal_1_2"];
const Barishal_2 = ["Barishal_2_1", "Barishal_2_2"];
const Barishal_3 = ["Barishal_3_1", "Barishal_3_2"];
const Barishal_4 = ["Barishal_4_1", "Barishal_4_2"];
const Barishal_5 = ["Barishal_5_1"];
const Barishal_6 = ["Barishal_6_1"];
const Barishal = [Barishal_1, Barishal_2, Barishal_3, Barishal_4, Barishal_5, Barishal_6];

const Jhalokati_1 = ["Jhalokati_1_1", "Jhalokati_1_2"];
const Jhalokati_2 = ["Jhalokati_2_1", "Jhalokati_2_2"];
const Jhalokati = [Jhalokati_1, Jhalokati_2];

const Pirojpur_1 = ["Pirojpur_1_1", "Pirojpur_1_2", "Pirojpur_1_3"];
const Pirojpur_2 = ["Pirojpur_2_1", "Pirojpur_2_2", "Pirojpur_2_3"];
const Pirojpur_3 = ["Pirojpur_3_1"];
const Pirojpur = [Pirojpur_1, Pirojpur_2, Pirojpur_3];

// ----------------- SYLHET DIVISION ------------------ //

const Sunamganj_1 = ["Sunamganj_1_1", "Sunamganj_1_2", "Sunamganj_1_3", "Sunamganj_1_4"];
const Sunamganj_2 = ["Sunamganj_2_1", "Sunamganj_2_2"];
const Sunamganj_3 = ["Sunamganj_3_1", "Sunamganj_3_2"];
const Sunamganj_4 = ["Sunamganj_4_1", "Sunamganj_4_2"];
const Sunamganj_5 = ["Sunamganj_5_1", "Sunamganj_5_2"];
const Sunamganj = [Sunamganj_1, Sunamganj_2, Sunamganj_3, Sunamganj_4, Sunamganj_5];

const Sylhet_1 = ["Sylhet_1_1"];
const Sylhet_2 = ["Sylhet_2_1", "Sylhet_2_2"];
const Sylhet_3 = ["Sylhet_3_1", "Sylhet_3_2", "Sylhet_3_3"];
const Sylhet_4 = ["Sylhet_4_1", "Sylhet_4_2", "Sylhet_4_3"];
const Sylhet_5 = ["Sylhet_5_1", "Sylhet_5_2"];
const Sylhet_6 = ["Sylhet_6_1", "Sylhet_6_2"];
const Sylhet = [Sylhet_1, Sylhet_2, Sylhet_3, Sylhet_4, Sylhet_5, Sylhet_6];

const Moulvibazar_1 = ["Moulvibazar_1_1", "Moulvibazar_1_2"];
const Moulvibazar_2 = ["Moulvibazar_2_1"];
const Moulvibazar_3 = ["Moulvibazar_3_1", "Moulvibazar_3_2"];
const Moulvibazar_4 = ["Moulvibazar_4_1", "Moulvibazar_4_2"];
const Moulvibazar = [Moulvibazar_1, Moulvibazar_2, Moulvibazar_3, Moulvibazar_4];

const Habiganj_1 = ["Habiganj_1_1", "Habiganj_1_2"];
const Habiganj_2 = ["Habiganj_2_1", "Habiganj_2_2"];
const Habiganj_3 = ["Habiganj_3_1", "Habiganj_3_2"];
const Habiganj_4 = ["Habiganj_4_1", "Habiganj_4_2"];
const Habiganj = [Habiganj_1, Habiganj_2, Habiganj_3, Habiganj_4];


export const DistrictToAreaMap = new Map<string, string[][]>()
DistrictToAreaMap.set("Panchagarh", Panchagarh);
DistrictToAreaMap.set("Thakurgaon", Thakurgaon);
DistrictToAreaMap.set("Dinajpur", Dinajpur);
DistrictToAreaMap.set("Nilphamari", Nilphamari);
DistrictToAreaMap.set("Lalmonirhat", Lalmonirhat);
DistrictToAreaMap.set("Rangpur", Rangpur);
DistrictToAreaMap.set("Kurigram", Kurigram);
DistrictToAreaMap.set("Gaibandha", Gaibandha);
DistrictToAreaMap.set("Joypurhat", Joypurhat);
DistrictToAreaMap.set("Bogra", Bogra);
DistrictToAreaMap.set("Chapainawabganj", Chapainawabganj);
DistrictToAreaMap.set("Naogaon", Naogaon);
DistrictToAreaMap.set("Rajshahi", Rajshahi);
DistrictToAreaMap.set("Natore", Natore);
DistrictToAreaMap.set("Sirajganj", Sirajganj);
DistrictToAreaMap.set("Pabna", Pabna);
DistrictToAreaMap.set("Meherpur", Meherpur);
DistrictToAreaMap.set("Kushtia", Kushtia);
DistrictToAreaMap.set("Chuadanga", Chuadanga);
DistrictToAreaMap.set("Jhenaidah", Jhenaidah);
DistrictToAreaMap.set("Jessore", Jessore);
DistrictToAreaMap.set("Magura", Magura);
DistrictToAreaMap.set("Narail", Narail);
DistrictToAreaMap.set("Bagerhat", Bagerhat);
DistrictToAreaMap.set("Khulna", Khulna);
DistrictToAreaMap.set("Satkhira", Satkhira);
DistrictToAreaMap.set("Tangail", Tangail);
DistrictToAreaMap.set("Kishorganj", Kishorganj);
DistrictToAreaMap.set("Manikganj", Manikganj);
DistrictToAreaMap.set("Munshiganj", Munshiganj);
DistrictToAreaMap.set("Dhaka", Dhaka);
DistrictToAreaMap.set("Gazipur", Gazipur);
DistrictToAreaMap.set("Narsingdi", Narsingdi);
DistrictToAreaMap.set("Narayanganj", Narayanganj);
DistrictToAreaMap.set("Rajbari", Rajbari);
DistrictToAreaMap.set("Faridpur", Faridpur);
DistrictToAreaMap.set("Gopalganj", Gopalganj);
DistrictToAreaMap.set("Madaripur", Madaripur);
DistrictToAreaMap.set("Shariatpur", Shariatpur);
DistrictToAreaMap.set("Jamalpur", Jamalpur);
DistrictToAreaMap.set("Sherpur", Sherpur);
DistrictToAreaMap.set("Mymensingh", Mymensingh);
DistrictToAreaMap.set("Netrokona", Netrokona);
DistrictToAreaMap.set("Brahmanbaria", Brahmanbaria);
DistrictToAreaMap.set("Comilla", Comilla);
DistrictToAreaMap.set("Chandpur", Chandpur);
DistrictToAreaMap.set("Feni", Feni);
DistrictToAreaMap.set("Noakhali", Noakhali);
DistrictToAreaMap.set("Laxmipur", Laxmipur);
DistrictToAreaMap.set("Chittagong", Chittagong);
DistrictToAreaMap.set("CoxsBazar", CoxsBazar);
DistrictToAreaMap.set("Khagrachari", Khagrachari);
DistrictToAreaMap.set("Rangamati", Rangamati);
DistrictToAreaMap.set("Bandarban", Bandarban);
DistrictToAreaMap.set("Barguna", Barguna);
DistrictToAreaMap.set("Patuakhali", Patuakhali);
DistrictToAreaMap.set("Bhola", Bhola);
DistrictToAreaMap.set("Barishal", Barishal);
DistrictToAreaMap.set("Jhalokati", Jhalokati);
DistrictToAreaMap.set("Pirojpur", Pirojpur);
DistrictToAreaMap.set("Sunamganj", Sunamganj);
DistrictToAreaMap.set("Sylhet", Sylhet);
DistrictToAreaMap.set("Moulvibazar", Moulvibazar);
DistrictToAreaMap.set("Habiganj", Habiganj);

export const areaToUpazillaMap = new Map<string, string[]>()

districts.forEach((district) => {
    const areas = DistrictToAreaMap.get(district);
    if (areas) {
        areas.forEach((areaList, idx) => {
            areaList.forEach((upazilla) => {
                if (!areaToUpazillaMap.has(`${district}-${idx + 1}`)) {
                    areaToUpazillaMap.set(`${district}-${idx + 1}`, []);
                }
                areaToUpazillaMap.get(`${district}-${idx + 1}`)?.push(upazilla);
            })
        })
    }
})

export const districtDivisionMap: Record<string, string> = {};

divisions.forEach(division => {
    if (division_districts.hasOwnProperty(division)) {
        division_districts[division].forEach(district => {
            districtDivisionMap[district] = division;
        })
    }
})