"use client";

import { authClient } from "@/lib/auth-client";
import { DateField, Label, Card, Button } from "@heroui/react";
import React, { useState } from "react";

const BookingCard = ({ destination }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [departureDate, setDepartureDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const { price, _id, destinationName, imageUrl, country } = destination || {};

    const handleBooking = async () => {
        // Guard: user must be logged in
        if (!user) {
            setError("Please log in to make a booking.");
            return;
        }

        // Guard: departure date must be selected
        if (!departureDate) {
            setError("Please select a departure date.");
            return;
        }

        // Guard: destination data must exist
        if (!_id) {
            setError("Destination data is missing. Please refresh the page.");
            return;
        }

        setError(null);
        setSuccess(false);
        setLoading(true);

        try {
            const bookingData = {
                userId: user.id,
                userImage: user.image,
                username: user.name,
                destinationId: _id,
                destinationName,
                price,
                imageUrl,
                country,
                departureDate: new Date(departureDate),
            };

            const res = await fetch("http://localhost:5000/booking", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(bookingData),
            });

            if (!res.ok) {
                throw new Error(`Booking failed: ${res.status}`);
            }

            const data = await res.json();
            console.log("Booking success:", data);
            setSuccess(true);
        } catch (err) {
            console.error("Booking error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="rounded-none border mt-5 p-4 flex flex-col gap-3">
            <p className="text-sm text-muted">Starting from</p>
            <p className="text-3xl font-bold text-cyan-500">${price}</p>
            <p className="text-sm text-muted">per person</p>

            <DateField
                className="w-[256px]"
                name="date"
                onChange={setDepartureDate}
            >
                <Label>Departure Date</Label>
                <DateField.Group>
                    <DateField.Input>
                        {(segment) => <DateField.Segment segment={segment} />}
                    </DateField.Input>
                </DateField.Group>
            </DateField>

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            {success && (
                <p className="text-sm text-green-500">Booking confirmed!</p>
            )}

            <Button
                onClick={handleBooking}
                isLoading={loading}
                isDisabled={loading}
                className="w-full rounded-none bg-cyan-500"
            >
                {loading ? "Booking..." : "Book Now"}
            </Button>
        </Card>
    );
};

export default BookingCard;