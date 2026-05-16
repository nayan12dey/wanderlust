"use client"


import { DateField, Label, Card, Button } from "@heroui/react";
import React from 'react';

const BookingCard = ({ destination }) => {

    const { price } = destination

    return (
        <Card className='rounded-none border mt-5'>
            <p className='text-sm text-muted'>Starting from</p>
            <p className='text-3xl font-bold text-cyan-500'>${price}</p>
            <p className='text-sm text-muted'>per person</p>

            <DateField className="w-[256px]" name="date">
                <Label>Departure Date</Label>
                <DateField.Group>
                    <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                </DateField.Group>
            </DateField>

            <Button className={"w-full rounded-none bg-cyan-500"}>Book Now</Button>
        </Card>
    );
};

export default BookingCard;