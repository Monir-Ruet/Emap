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
];

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
export const responsibleParties = ["Government", "Military", "Police", "Political Groups", "Religious Groups", "Criminal Organizations", "Unknown"];
export const minorities = ["Ethnic Minorities", "Religious Minorities", "LGBTQ+"];
