"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  calculateAverage,
  convertDateToReadableString,
  sortByDateDescending,
} from "@/lib/utils";
import { Berat } from "@/lib/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const berats: Berat[] = [
  {
    id: 1,
    tanggal: "2022-03-15T14:00:00.000Z",
    max: 99,
    min: 98,
    perbedaan: 1,
  },
  {
    id: 2,
    tanggal: "2024-03-16T14:00:00.000Z",
    max: 76,
    min: 69,
    perbedaan: 7,
  },
  {
    id: 3,
    tanggal: "2024-03-16T14:00:00.000Z",
    max: 80,
    min: 78,
    perbedaan: 2,
  },
];

// async function getData() : Promise<Berat[]> {
//   try {
//     const response = await fetch("http://be-app:3000");
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data: Berat[] = await response.json();
//     return data
//   } catch (error) {
//     console.error("Error fetching data: ", error);
//     return []
//   }
// }

export default function Home() {
  
  // const testData = await getData();
  const [data, setData] = useState<Berat[]>([]);

  async function getData() {
    try {
      const response = await fetch("http://be-app:3000");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Berat[] = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-400">
      <Table className="bg-white rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead className="w-[15vw]">Status</TableHead>
            <TableHead className="w-[15vw]">Method</TableHead>
            <TableHead className="w-[15vw]">Amount</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortByDateDescending(data).map((berat) => (
            <TableRow key={berat.id}>
              <TableCell className="font-medium">
                {convertDateToReadableString(berat.tanggal)}
              </TableCell>
              <TableCell>{berat.max}</TableCell>
              <TableCell>{berat.min}</TableCell>
              <TableCell>{berat.perbedaan}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="bg-black px-[5px] py-[3px] rounded-md text-white">
                    Action
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Detail</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Rata-rata</TableCell>
            <TableCell>{calculateAverage(data, "max")}</TableCell>
            <TableCell>{calculateAverage(data, "min")}</TableCell>
            <TableCell colSpan={2}>
              {calculateAverage(data, "perbedaan")}
            </TableCell>
          </TableRow>
        </TableFooter>
        <TableCaption>
          <Button>
            Add new data
          </Button>
        </TableCaption>
      </Table>
    </main>
  );
}
