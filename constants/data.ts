export const districts = ["Thakurgaon", "Panchagarh", "Nilphamari", "Lalmonirhat", "Kurigram", "Sherpur",
    "Jamalpur", "Mymensingh", "Netrokona", "Sunamganj", "Sylhet", "Moulvibazar", "Habiganj",
    "Brahmanbaria", "Khagrachari", "Rangamati", "Bandarban", "CoxsBazar", "Chittagong", "Noakhali",
    "Comilla", "Feni", "Bhola", "Patuakhali", "Barguna", "Pirojpur", "Jhalokati",
    "Chandpur", "Kishorganj", "Narsingdi", "Gazipur", "Laxmipur", "Barishal",
    "Shariatpur", "Rajshahi", "Satkhira", "Jessore", "Jhenaidah", "Chuadanga",
    "Chapainawabganj", "Naogaon", "Rangpur", "Gaibandha", "Bagerhat", "Khulna", "Dinajpur",
    "Sirajganj", "Natore", "Tangail", "Joypurhat", "Pabna", "Magura",
    "Madaripur", "Munshiganj", "Meherpur", "Kushtia", "Rajbari", "Narail",
    "Gopalganj", "Manikganj", "Narayanganj", "Faridpur", "Bogra", "Dhaka"
].sort();

export const divisions = ["Dhaka", "Chittagong", "Khulna", "Barishal", "Rajshahi", "Rangpur", "Mymensingh", "Sylhet"];

export const division_districts: Record<string, string[]> = {
    "Dhaka": [
        "Dhaka",
        "Gazipur",
        "Narayanganj",
        "Narsingdi",
        "Manikganj",
        "Munshiganj",
        "Faridpur",
        "Gopalganj",
        "Madaripur",
        "Rajbari",
        "Shariatpur",
        "Kishorganj",
        "Tangail"
    ],
    "Chittagong": [
        "Chittagong",
        "CoxsBazar",
        "Bandarban",
        "Rangamati",
        "Khagrachari",
        "Noakhali",
        "Feni",
        "Laxmipur",
        "Comilla",
        "Chandpur",
        "Brahmanbaria"
    ],
    "Rajshahi": [
        "Rajshahi",
        "Natore",
        "Naogaon",
        "Chapainawabganj",
        "Joypurhat",
        "Bogra",
        "Pabna",
        "Sirajganj"
    ],
    "Khulna": [
        "Khulna",
        "Bagerhat",
        "Satkhira",
        "Jessore",
        "Narail",
        "Magura",
        "Jhenaidah",
        "Chuadanga",
        "Meherpur",
        "Kushtia"
    ],
    "Barishal": [
        "Barishal",
        "Bhola",
        "Patuakhali",
        "Barguna",
        "Pirojpur",
        "Jhalokati"
    ],
    "Sylhet": [
        "Sylhet",
        "Moulvibazar",
        "Habiganj",
        "Sunamganj"
    ],
    "Rangpur": [
        "Rangpur",
        "Dinajpur",
        "Thakurgaon",
        "Panchagarh",
        "Nilphamari",
        "Lalmonirhat",
        "Kurigram",
        "Gaibandha"
    ],
    "Mymensingh": [
        "Mymensingh",
        "Jamalpur",
        "Sherpur",
        "Netrokona"
    ]
}

export const divisionColorMap: Record<string, string> = {
    "Dhaka": "#026965cc",
    "Chittagong": "#07395Ccc",
    "Rajshahi": "#747299",
    "Khulna": "#842225cc",
    "Barishal": "#414946",
    "Mymensingh": "#045D56cc",
    "Sylhet": "#004a99cc",
    "Rangpur": "#31694Ecc"
}

export const violenceTypes = ["Physical Assault", "Sexual Violence", "Psychological Abuse", "Economic Exploitation", "Hate Crime", "Domestic Violence", "Workplace Harassment"];
export const responsibleParties = ["Bangladesh Nationalist Party (BNP)",
    "Islami Andolan Bangladesh",
    "Bangladesh Jamaat-e-Islami",
    "Jatiya Party",
    "Gono Odhikar Parishad",
    "Communist Party of Bangladesh (CPB)",
    "Insaniyat Biplob Bangladesh",
    "Bangladesher Samajtantrik Dal (Basad)",
    "Bangladesh Khelafat Majlis",
    "National Citizen Party (NCP)",
    "Amar Bangladesh (AB) Party",
    "Jatiya Samajtantrik Dal (JSD - Rab)",
    "Bangladesher Samajtantrik Dal (Marxist)",
    "Bangladesh Islami Front",
    "Liberal Democratic Party (LDP)",
    "Jonotar Dal",
    "Gano Forum",
    "Islamic Front Bangladesh",
    "Bangladesh Supreme Party",
    "Khelafat Majlis",
    "Bangladesh Sangskritik Mukti Jote",
    "Bangladesh Labour Party",
    "Bangladesh Congress",
    "Ganosamhati Andolon",
    "Amjonotar Dal",
    "Bangladesh Muslim League",
    "Bangladesh Republican Party",
    "Jatiya Party (other faction)",
    "Nagorik Oikya",
    "Bangladesh Khilafat Andolan",
    "Bangladesh Nationalist Front",
    "Bangladesh Minority Janata Party",
    "Bangladesh Jasad",
    "Nationalist Democratic Movement",
    "Bangladesh Jatiyatabadi Andolon",
    "Revolutionary Workers Party of Bangladesh",
    "Bangladesh Muslim League (BML)",
    "Zaker Party",
    "Bangladesh Nezame Islam Party",
    "Gano Front",
    "Independent",
    "Bangladesh Jatiya Party (Sirajul)",
    "Jamiat Ulema-e-Islam Bangladesh",
    "Bangladesh Equal Rights Party (BEP)"];

export const minorities = ["Hindus", "Buddhists", "Christians", "Ahmadiyya", "CHT Indigenous", "Plains Land Indigenous"];


export const mild = ["Intimidation", "Hate speech", "Provocation", "Obstruction", "Rumours", "Tampering", "Carrying weapons", "Ejection", "Buying Vote"];
export const moderate = ["Ejection", "Group clashes", "Physical confrontation", "Vandalism", "Physical damages during vandalism", "Mob Coercion", "Destruction"];
export const extreme = ["Firearm", "Mass riot", "Kidnapping", "Murder", "Attempt to murder", "State brutality", "Rape", "Sexual Harassment"];