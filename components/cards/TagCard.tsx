import ROUTES from "@/constants/routes";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";
import { getDeviconClassName } from "@/lib/utils";

interface Props {
  _id?: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  isRemovableButton?: boolean;
  handleRemoveTag?: (name: string) => void;
}

const TagCard = ({
  _id,
  name,
  questions = 0,
  showCount = false,
  isRemovableButton = false,
  handleRemoveTag,
}: Props) => {
  const iconClass = getDeviconClassName(name);
  return (
    <Link
      href={_id ? ROUTES.TAGS(_id) : ""}
      className="flex justify-between gap-2"
    >
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          <i className={`${iconClass} text-sm`}></i>
          <span>{name}</span>
        </div>
        {isRemovableButton ? (
          <span
            className="ml-2 text-primary-500 hover:cursor-pointer"
            role="button"
            onClick={() => handleRemoveTag?.(name)}
          >
            x
          </span>
        ) : (
          <></>
        )}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </Link>
  );
};

export default TagCard;
