import { MdAdd } from "react-icons/md";
import Button from "./module/shared/components/Button";
import Card from "./module/shared/components/Card";
import Table, { IHead } from "./module/shared/components/Table";

function App() {
  interface IItems {
    id: number;
    name: string;
  }
  function handleClick(e: Element | null) {
    console.log(e);
  }

  const head: IHead[] = [
    {
      key: "id",
      label: "id",
    },
    {
      key: "name",
      label: "name",
    },
  ];

  const items: IItems[] = [
    {
      id: 1,
      name: "ali",
    },
    {
      id: 2,
      name: "ahmad",
    },
  ];

  function cellProps(key: string, value: IItems) {
    return <div key={key}>{value.name}</div>;
  }

  return (
    <div className="container mx-auto px-4 mt-5 bg-white dark:bg-black">
      <Button
        type="reset"
        color="danger"
        class="mb-10"
        icon={<MdAdd />}
        clicked={handleClick}
      >
        عنوان
      </Button>

      <Card classes="mb-10">test</Card>

      <Table items={items} heads={head} cellProps={cellProps} />
    </div>
  );
}

export default App;
