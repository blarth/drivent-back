import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { number } from 'joi';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
        hotelPrice: 350,
      },
    });
  }
  let tickets = await prisma.ticket.findFirst();
  if (!tickets) {
    await prisma.ticket.create({
      data: {
        isVirtual: false,
        description: 'Presencial',
      },
    });

    await prisma.ticket.create({
      data: {
        isVirtual: true,
        description: 'Online',
      },
    });
  }
  let eventTicket = await prisma.eventTicket.findFirst();
  if (!eventTicket) {
    await prisma.eventTicket.create({
      data: {
        eventId: 1,
        ticketId: 1,
        price: 250,
        name: null,
      },
    });
    await prisma.eventTicket.create({
      data: {
        eventId: 1,
        ticketId: 2,
        price: 100,
        name: null,
      },
    });
  }

  let hotels = await prisma.hotel.findFirst()
  if(!hotels) {
    await prisma.hotel.create({
      data : {
        name : "Driven Resort",
        imagePath : "https://www.sn.at/wiki/images/1/16/Front_view_by_night_Sheraton_Salzburg_Hotel.jpg"
      }
    })
    await prisma.hotel.create({
      data : {
        name : "Driven Palace",
        imagePath : "https://www.efteling.com/en/-/media/images/nieuw-meetings-en-events/meetings-and-events/locaties/efteling-hotel/1024x576-locaties-hotel-imagegallerij.jpg"
      }
    })
    await prisma.hotel.create({
      data : {
        name : "Driven World",
        imagePath : "https://www.e-lazne.eu/uploads/images/hotel/5e36d9e5056ea_hotel_savoy_spindleruv_mlyn.jpg"
      }
    })
  }

  let styles = await prisma.roomStyle.findFirst()
  if(!styles){
    await prisma.roomStyle.create({
      data : {
        name : "Single",
        beds : 1
      }
    })
    await prisma.roomStyle.create({
      data : {
        name : "Double",
        beds : 2
      }
    })
    await prisma.roomStyle.create({
      data : {
        name : "Triple",
        beds : 3
      }
    })
  }

  let roomsExists = await prisma.room.findFirst()
  if(!roomsExists){
    for(let i=1; i<= 3; i++){
    for(let j = 0; j<10; j++){
      const roomStyleId = generateRoomStyleId()
      await prisma.room.create({
        data : {
          number : `10${j}`,
          hotelId : i,
          styleId : roomStyleId
        }
      })
    }
  }
  }

  const rooms = await prisma.room.findMany({})
  console.log({ rooms })
}

function generateRoomStyleId(){
  const x = Math.random()
  if(x < 0.33) return 1
  if(x < 0.66) return 2
  return 3
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
