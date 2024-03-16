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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const [date, setDate] = useState(Date.now());
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);

  async function getData() {
    try {
      const response = await fetch("http://localhost:13000");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Berat[] = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  async function handleDelete(id: number) {
    try {
      const response = await fetch(`http://localhost:13000/berat/${id}`, {
        method: "DELETE",
      });
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
            <TableHead>Tanggal</TableHead>
            <TableHead className="w-[15vw]">Max</TableHead>
            <TableHead className="w-[15vw]">Min</TableHead>
            <TableHead className="w-[15vw]">Perbedaan</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            sortByDateDescending(data).map((berat) => (
              <TableRow key={berat.id}>
                <TableCell className="font-medium">
                  {convertDateToReadableString(berat.tanggal)}
                </TableCell>
                <TableCell>{berat.max}</TableCell>
                <TableCell>{berat.min}</TableCell>
                <TableCell>{berat.perbedaan}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Detail</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          {convertDateToReadableString(berat.tanggal)}
                        </DialogTitle>
                        <DialogDescription>
                          {`Max : ${berat.max}\n`}
                          {`Min : ${berat.min}\n`}
                          {`Perbedaan : ${berat.perbedaan}\n`}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Edit</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"

    
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button onClick={() => handleDelete(berat.id)}>Delete</Button>
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
          <Button>Add new data</Button>
        </TableCaption>
      </Table>
    </main>
  );
}
