import starFilled from "../assets/star-filled.png";
import starBlank from "../assets/star-blank.png";
import starHalf from "../assets/star-half.png";

export const starRating = (star) => {
  let totalStars = 5;
  let stars = [];
  let starFilledCount = Math.floor(star);

  for (let i = 0; i < starFilledCount; i++) {
    stars.push(starFilled);
  }

  totalStars -= starFilledCount;

  if (!Number.isInteger(star)) {
    stars.push(starHalf);
    totalStars -= 1;
  }

  while (totalStars) {
    stars.push(starBlank);
    totalStars -= 1;
  }

  return stars;
};
