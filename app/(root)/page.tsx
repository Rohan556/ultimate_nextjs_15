import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";

const questions: Question[] = [
  {
    _id: "1",
    title: "How to implement a binary search algorithm in JavaScript?",
    tags: [
      { _id: "1", name: "JavaScript" },
      { _id: "2", name: "Algorithms" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    },
    createdAt: new Date("2023-01-15T10:00:00Z"),
    upvotes: 15,
    answers: 4,
    views: 200,
  },
  {
    _id: "2",
    title: "What are the differences between React and Angular?",
    tags: [
      { _id: "3", name: "React" },
      { _id: "4", name: "Angular" },
      { _id: "5", name: "JavaScript" },
    ],
    author: {
      _id: "2",
      name: "Jane Smith",
      image:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    },
    createdAt: new Date("2023-02-20T14:30:00Z"),
    upvotes: 20,
    answers: 5,
    views: 300,
  },
  {
    _id: "3",
    title: "How to optimize SQL queries for better performance?",
    tags: [
      { _id: "6", name: "SQL" },
      { _id: "7", name: "Database" },
    ],
    author: {
      _id: "3",
      name: "Alice Johnson",
      image:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    },
    createdAt: new Date("2023-03-10T09:15:00Z"),
    upvotes: 10,
    answers: 3,
    views: 150,
  },
  // Add more questions as needed
];

async function Home() {
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button className="primary-gradient min-h-[46px] px-4 !text-light-900">
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otheClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
}

export default Home;
