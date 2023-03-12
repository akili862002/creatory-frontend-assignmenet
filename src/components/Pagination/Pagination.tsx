import React from "react";
import { cn } from "../../utils/classnames.utils";
import { PropsWithChildren, ReactNode } from "react";
import { LeftIcon, RightIcon } from "./Pagination.icons";

type IPaginationSize = "sm" | "md";

export interface IPaginationProps {
  className?: string;
  size?: IPaginationSize;
  selected: number;
  totalCount: number;
  sizePerPage: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({
  size = "md",
  className,
  selected,
  totalCount,
  sizePerPage,
  onChange,
}) => {
  const pageCount = Math.ceil(totalCount / sizePerPage);

  const createPageView = (index: number) => (
    <PageItem
      key={index}
      size={size}
      selected={index === selected}
      onClick={() => onChange(index)}
    >
      {index + 1}
    </PageItem>
  );

  const pagination = () => {
    const items: ReactNode[] = [];
    const pageRangeDisplayed = 2;
    const marginPagesDisplayed = 2;
    const breakLabel = "...";

    if (pageCount <= pageRangeDisplayed) {
      for (let index = 0; index < pageCount; index++) {
        items.push(createPageView(index));
      }
    } else {
      let leftSide = pageRangeDisplayed / 2;
      let rightSide = pageRangeDisplayed - leftSide;

      if (selected > pageCount - pageRangeDisplayed / 2) {
        rightSide = pageCount - selected;
        leftSide = pageRangeDisplayed - rightSide;
      } else if (selected < pageRangeDisplayed / 2) {
        leftSide = selected;
        rightSide = pageRangeDisplayed - leftSide;
      }

      let breakView: ReactNode;

      const pagesBreaking = [];
      for (let index = 0; index < pageCount; index++) {
        const page = index + 1;

        if (page <= marginPagesDisplayed) {
          pagesBreaking.push({
            type: "page",
            index,
            display: createPageView(index),
          });
          continue;
        }

        if (page > pageCount - marginPagesDisplayed) {
          pagesBreaking.push({
            type: "page",
            index,
            display: createPageView(index),
          });
          continue;
        }

        const adjustedRightSide =
          selected === 0 && pageRangeDisplayed > 1 ? rightSide - 1 : rightSide;

        if (
          index >= selected - leftSide &&
          index <= selected + adjustedRightSide
        ) {
          pagesBreaking.push({
            type: "page",
            index,
            display: createPageView(index),
          });
          continue;
        }

        if (
          breakLabel &&
          pagesBreaking.length > 0 &&
          pagesBreaking[pagesBreaking.length - 1].display !== breakView &&
          (pageRangeDisplayed > 0 || marginPagesDisplayed > 0)
        ) {
          breakView = <PageItem size={size}>...</PageItem>;
          pagesBreaking.push({ type: "break", index, display: breakView });
        }
      }
      pagesBreaking.forEach((pageElement, i) => {
        let actualPageElement = pageElement;
        if (
          pageElement.type === "break" &&
          pagesBreaking[i - 1] &&
          pagesBreaking[i - 1].type === "page" &&
          pagesBreaking[i + 1] &&
          pagesBreaking[i + 1].type === "page" &&
          pagesBreaking[i + 1].index - pagesBreaking[i - 1].index <= 2
        ) {
          actualPageElement = {
            type: "page",
            index: pageElement.index,
            display: createPageView(pageElement.index),
          };
        }
        items.push(actualPageElement.display);
      });
    }

    return items;
  };

  return (
    <div className={className}>
      <div className="flex items-center space-x-0.5 font-semibold text-gray-500 rounded-lg text-md w-min">
        <SkipButton
          disabled={selected <= 0}
          onClick={() => onChange(selected - 1)}
        >
          <LeftIcon />
        </SkipButton>
        {pagination()}
        <SkipButton
          disabled={selected >= pageCount - 1}
          onClick={() => onChange(selected + 1)}
        >
          <RightIcon />
        </SkipButton>
      </div>
    </div>
  );
};

const SkipButton: React.FC<
  PropsWithChildren<{
    disabled: boolean;
    className?: string;
    onClick: () => void;
  }>
> = ({ children, className, disabled, onClick }) => {
  return (
    <button
      className={cn(
        "w-8 h-8 rounded-lg center-children focus:z-30 disabled:opacity-30 active:bg-gray-200 disabled:active:bg-transparent",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const PageItem: React.FC<
  PropsWithChildren<{
    size: IPaginationSize;
    selected?: boolean;
    onClick?: () => void;
  }>
> = ({ children, selected, size, onClick }) => {
  return (
    <button
      onClick={onClick}
      tabIndex={selected ? -1 : 0}
      className={cn(
        "w-8 h-8 rounded-lg focus:z-30",
        selected
          ? "bg-gray-900 text-white"
          : "active:bg-gray-100 text-gray-500 hover:text-gray-900",
        size === "md" && "w-4 h-4",
        size === "sm" && "w-3 h-3 text-sm"
      )}
    >
      {children}
    </button>
  );
};
