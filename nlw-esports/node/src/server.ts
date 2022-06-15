import express from "express";

import cors from "cors";

import { PrismaClient } from "@prisma/client";

import { convertHourStringToMinutes } from "./utils/convert-hours-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hour-string";

const app = express();

const prisma = new PrismaClient({
    log: ["query"]
});

app.use(express.json());

// app.use(cors({
//     origin: "https://localhost:3000"
// }));

app.use(cors());

app.get("/games", async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })

    return res.json(games)
});

app.post("/games/:id/ads", async (req, res) => {
    const gameId = req.params.id;
    const { name, yearsPlaying, discord, weekDays, hoursStart, hoursEnd, useVoiceChannel } = req.body;
    
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name,
            yearsPlaying,
            discord,
            weekDays: weekDays.join(","),
            hoursStart: convertHourStringToMinutes(hoursStart),
            hoursEnd: convertHourStringToMinutes(hoursEnd),
            useVoiceChannel
        }
    })

    return res.status(201).json(ad)
});

app.get("/games/:id/ads", async (req, res) => {
    const gameId = req.params.id;

    const ads: any = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hoursStart: true,
            hoursEnd: true
        },
        
        where: {
            gameId
        },

        orderBy: {
            createdAt: "desc"
        }
    })

    return res.json(ads.map((ad: any) => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(","),
            hoursStart: convertMinutesToHourString(ad.hoursStart),
            hoursEnd: convertMinutesToHourString(ad.hoursEnd)
        }
    }))
});

app.get("/ads/:id/discord", async (req, res) => {
    const adId = req.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },

        where: {
            id: adId
        }
    })

    return res.json({
        discord: ad.discord
    })
});

app.listen(3333, () => console.log("Running at port 3333"));