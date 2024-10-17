export const physiciansList: { uid: string; name: string }[] = [
  { uid: "UID_060Z6BZZDCC3FY0987Y4", name: "Ali, NP, Jessica Fay" },
  { uid: "UID_Az86426924_1451", name: "Gelfand, MD, Robert" },
  { uid: "UID_066ATE4VW2A49WWGN5KW", name: "Ghuman, MD, Damanjit" },
  { uid: "UID_VV664631032_1165", name: "Kramer, MD, Rachel" },
  { uid: "UID_VV370565293_2160", name: "Livescu, NP, Nicole" },
] as const;

export const physicianNamesList: string[] = [
  ...physiciansList.map((x) => x.name),
] as const;
