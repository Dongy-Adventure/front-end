import Image, { StaticImageData } from 'next/image';
import PLACEHOLDER from '@/../public/placeholder.png';

interface ReviewCard {
  image?: StaticImageData;
  reviewer: string;
  message: string;
  score: number;
  date: string;
}

export default function Card(props: ReviewCard) {
  const { image, reviewer, message, score, date } = props;
  return (
    <section className="bg-white rounded-2xl p-2 shadow-lg text-black">
      <div className="flex justify-between gap-2 p-2">
        <div className="flex gap-2">
          <Image
            src={image ?? PLACEHOLDER}
            alt={reviewer}
            width={30}
            height={30}
          />
          <h1>{reviewer}</h1>
        </div>

        <h1>{score} / 10</h1>
      </div>
      <hr />
      <h1>{message}</h1>
      {new Date(date).toLocaleDateString()}
    </section>
  );
}
