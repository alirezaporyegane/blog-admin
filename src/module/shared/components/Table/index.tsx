import { ReactNode } from "react";

export interface IHead {
  key: string;
  label: string;
  classes?: string;
}

interface IProps<T> {
  heads: IHead[];
  bodyClass?: string;
  headClasses?: string;
  items: T[];
  cellProps?: (key: string, value: T) => ReactNode;
}

const Table = <T extends object>(props: IProps<T>) => {
  return (
    <div className="border bg-white rounded-xl overflow-hidden">
      <table className="table-auto border-collapse w-full text-sm">
        {props?.heads?.length && (
          <>
            <thead
              className={`${
                props.headClasses ? props.headClasses : ""
              }bg-gray-50`}
            >
              <tr>
                {props.heads.map((head: IHead) => {
                  return (
                    <th
                      key={head.key}
                      className={`${
                        head.classes ? head.classes : ""
                      }border-b dark:border-slate-600 font-medium pe-8 ps-4 py-3 text-gray-600 dark:text-slate-200 text-right`}
                    >
                      {head.label}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className={props.bodyClass}>
              {props.items.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={
                      index !== props.items.length - 1 ? "border-b" : ""
                    }
                  >
                    {Object.keys(item).map((key) => {
                      return (
                        <td key={key} className="py-3 ps-4 pe-8">
                          {props.cellProps
                            ? props.cellProps(key, item)
                            : item[key as keyof item]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};

export default Table;
