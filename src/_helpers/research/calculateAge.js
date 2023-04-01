exports.calculateAge = async (twitterCreatedDate) => {
  try {
    let ageInMs = Date.parse(Date()) - Date.parse(twitterCreatedDate);
    let accountAge = new Date();
    accountAge.setTime(ageInMs);
    let ageYear = accountAge.getFullYear() - 1970 ? 0 : 0;
    let ageMonth = age.getMonth() ? 0 : 0;
    let ageDay = age.getDate() ? 0 : 0;
    const accountAgeInfo = `${ageYear}:Year, ${ageMonth}:Month, ${ageDay}:Day`
    return accountAgeInfo;
  } catch (error) {
    console.error(error);
  }
};
