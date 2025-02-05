"use client";

import TagCard from "@/components/cards/TagCard";
import Link from "next/link";

import React from "react";

const hotQuestions = [
  {
    _id: "1",
    title: "How to create a custom hook in React?",
  },
  {
    _id: "2",
    title: "How to use React Router?",
  },
  {
    _id: "3",
    title: "How to use Redux?",
  },
  {
    _id: "4",
    title: "How to use Context API?",
  },
  {
    _id: "5",
    title: "How to use React Query?",
  },
];

const popularTags = [
  {
    _id: "1",
    name: "React",
    questions: 100,
  },
  {
    _id: "2",
    name: "JavaScript",
    questions: 200,
  },
  {
    _id: "3",
    name: "TypeScript",
    questions: 150,
  },
  {
    _id: "4",
    name: "Next.js",
    questions: 120,
  },
  {
    _id: "5",
    name: "Node.js",
    questions: 180,
  },
  {
    _id: "6",
    name: "Express",
    questions: 100,
  },
  {
    _id: "7",
    name: "MongoDB",
    questions: 200,
  },
  {
    _id: "8",
    name: "GraphQL",
    questions: 150,
  },
  {
    _id: "9",
    name: "Apollo",
    questions: 120,
  },
  {
    _id: "10",
    name: "REST API",
    questions: 180,
  },
];

const RightSidebar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              key={question._id}
              className="flex gap-3"
              href={`/questions/${question._id}`}
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 text-light-900">
                {question._id}
              </div>
              <p className="text-dark200_light900">{question.title}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular tags</h3>
        <div className="mt-7 flex flex-col">
          {popularTags.map((tag) => (
            <TagCard
              key={tag._id}
              questions={tag.questions}
              name={tag.name}
              _id={tag._id}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
