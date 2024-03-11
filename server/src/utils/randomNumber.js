import crypto from 'crypto';

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const formatNumber = (randomNumber) => `FT-${randomNumber}`;

const generateAndExportRandomNumber = async () => {
  try {
    const min = 100000;
    const max = 999999;

    const randomNumber = generateRandomNumber(min, max);

    const formattedNumber = formatNumber(randomNumber);

    return formattedNumber;
  } catch (err) {
    console.error('Error generating and exporting number:', err);
  }
};

export default generateAndExportRandomNumber;
