export type WorkingGroup = "Curricula" | "Communication" | "Implementation";

export type Member = {
  name: string;
  country: string;
  email: string;
  telephone: string;
  groups: WorkingGroup[];
};

/**
 * Sankofa working-group members.
 * Source: "Sankofa 06_08_26.xlsx" (June 2026 roster).
 */
export const members: Member[] = [
  { name: "Ademola Dickson", country: "Nigeria", email: "tbgloballimited@gmail.com", telephone: "+234 706 796 5229", groups: ["Implementation"] },
  { name: "Amina Abubakar", country: "Nigeria", email: "amina@safe-africa.org", telephone: "+234 803 5066343", groups: ["Implementation"] },
  { name: "Amira Ouerfelli", country: "Tunisia", email: "amira.ouerfelli@ieee.org", telephone: "+216 24 624 340", groups: ["Curricula", "Communication", "Implementation"] },
  { name: "Anitta Antony", country: "India", email: "anittaantony5@gmail.com", telephone: "+91 88916 91490", groups: ["Curricula"] },
  { name: "Anjana Somasundaran", country: "India", email: "anjanasomasundaran.ee@cce.edu.in", telephone: "+91 75105 43971", groups: ["Curricula"] },
  { name: "Barbara Sabiiti Waako", country: "Uganda", email: "barbsabiiti@gmail.com", telephone: "+256 772 441 833", groups: ["Curricula"] },
  { name: "Bruce Mafuta", country: "DR Congo", email: "flmaestria17@gmail.com", telephone: "+243 810 032 564", groups: ["Curricula"] },
  { name: "Cherukuri Indira Dasgupta", country: "India", email: "cherukuri.indira@gmail.com", telephone: "+91 9810816150", groups: ["Implementation"] },
  { name: "Chilala Kakoma-Bowa", country: "Zambia", email: "chilalakakoma@gmail.com", telephone: "+260 96 6507269", groups: ["Curricula", "Implementation"] },
  { name: "Christie Etukudor", country: "Scotland", email: "c.etukudor@hw.ac.uk", telephone: "+44 7999090764", groups: ["Curricula", "Implementation"] },
  { name: "Desire C Mussa", country: "Malawi", email: "desiremussa@gmail.com", telephone: "+265 993171237", groups: ["Curricula"] },
  { name: "Donatus Njoku", country: "Nigeria", email: "njokudonatus1@gmail.com", telephone: "+234 803 682 4158", groups: ["Communication"] },
  { name: "Erika Kalenga", country: "Tanzania", email: "elikabonifasi@gmail.com", telephone: "+255 792 287 125", groups: ["Curricula", "Implementation"] },
  { name: "Fidelis Filipatali", country: "Tanzania", email: "ffilipatali@yahoo.com", telephone: "+255 767834245", groups: ["Curricula", "Implementation"] },
  { name: "Fredi Lutego", country: "Tanzania", email: "lutegofredi20@gmail.com", telephone: "+255 741750614", groups: ["Implementation"] },
  { name: "Ibiremi Ibikunle-Ayeni", country: "Nigeria", email: "ibiiyanu@gmail.com", telephone: "+234 816 116 4394", groups: ["Communication"] },
  { name: "Lane Maema", country: "South Africa", email: "nyamaema@yahoo.com", telephone: "+27 63 037 1849", groups: ["Curricula", "Implementation"] },
  { name: "Lawrence Ekeng", country: "Nigeria", email: "meetsirlawhere@gmail.com", telephone: "+234 806 133 0558", groups: ["Curricula", "Communication", "Implementation"] },
  { name: "Lettie Burton", country: "England", email: "mail@lettieb.co", telephone: "+44 7774 446529", groups: ["Curricula", "Communication", "Implementation"] },
  { name: "Mureithi Kivuti", country: "Kenya", email: "mureithikivuti@gmail.com", telephone: "+254 705 769 439", groups: ["Curricula"] },
  { name: "Mustapha Osman", country: "Ghana", email: "alhajistoph57@gmail.com", telephone: "+233 20 906 1069", groups: ["Implementation"] },
  { name: "Mweene Himwiinga", country: "Zambia", email: "mweenehimwiinga@gmail.com", telephone: "+260 95 5500432", groups: ["Curricula", "Implementation"] },
  { name: "Nicole Kawaako", country: "Uganda", email: "nkawaako@gmail.com", telephone: "+256 755 849 551", groups: ["Curricula"] },
  { name: "Nicolo Stevanato", country: "Italy", email: "nicolo.stevanato@polimi.it", telephone: "+39 3389359458", groups: ["Curricula"] },
  { name: "Nkenen Brendaline Shieka", country: "Cameroon", email: "nkenybren@gmail.com", telephone: "+237 53679559", groups: ["Curricula", "Implementation"] },
  { name: "Patience Kpeda", country: "Ghana", email: "kfountain655@gmail.com", telephone: "+233 543 435 294", groups: ["Implementation"] },
  { name: "Rania Nefzi", country: "Tunisia", email: "nefzirania145@gmail.com", telephone: "+216 27 518 122", groups: ["Communication"] },
  { name: "Ranjan Sen", country: "USA", email: "ranjan49sen@gmail.com", telephone: "+1 425 248 9646", groups: ["Implementation"] },
  { name: "Ray Larsen", country: "USA", email: "rslarsen@coastside.net", telephone: "+1 650 888 9075", groups: ["Curricula", "Communication", "Implementation"] },
  { name: "Salamatu Sani", country: "Nigeria", email: "saniSalamatu1@gmail.com", telephone: "+234 8101090977", groups: ["Curricula", "Communication", "Implementation"] },
  { name: "Santosh Kumar Patnaik", country: "India", email: "santosh.patnaik20@gmail.com", telephone: "+91 985 331 7488", groups: ["Curricula", "Implementation"] },
  { name: "Sudha Balagopalan", country: "India", email: "sudhabalagopalan@gmail.com", telephone: "+91 9349196440", groups: ["Curricula"] },
  { name: "Toby Cumberbatch", country: "USA", email: "toby.cumberbatch@cooper.edu", telephone: "+1 203 895 9698", groups: ["Curricula", "Communication", "Implementation"] },
];
