import React from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function PoolList() {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-white">Pool</TableHead>
            <TableHead className="text-white">Protocol</TableHead>
            <TableHead className="text-white">Free tier</TableHead>
            <TableHead className="text-white">TVL</TableHead>
            <TableHead className="text-white">Pool APR</TableHead>
            <TableHead className="text-white">Reward APR</TableHead>
            <TableHead className="text-white">1D vol</TableHead>
            <TableHead className="text-white">30D vol</TableHead>
            <TableHead className="text-white">1D vol/TVL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="p-4">
            <TableCell>1</TableCell>
            <TableCell>WISE/ETH</TableCell>
            <TableCell>v2</TableCell>
            <TableCell>0.3%</TableCell>
            <TableCell>$168.6M</TableCell>
            <TableCell>0.02%</TableCell>
            <TableCell>-</TableCell>
            <TableCell>$30.0K</TableCell>
            <TableCell>$877.9K</TableCell>
            <TableCell className="text-right">0.01</TableCell>
          </TableRow>
          <TableRow className="p-4">
            <TableCell>1</TableCell>
            <TableCell>WISE/ETH</TableCell>
            <TableCell>v2</TableCell>
            <TableCell>0.3%</TableCell>
            <TableCell>$168.6M</TableCell>
            <TableCell>0.02%</TableCell>
            <TableCell>-</TableCell>
            <TableCell>$30.0K</TableCell>
            <TableCell>$877.9K</TableCell>
            <TableCell className="text-right">0.01</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
