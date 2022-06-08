import { prisma } from '@/config';

async function findAll() {
  return await prisma.hotel.findMany({
    select: {
      id: true,
      name: true,
      imagePath: true,
      Room: {
        select: {
          number: true,
          EnrollmentTicket: {
            select: {
              id: true,
            },
          },
          Room: {
            select: {
              name: true,
              beds: true,
            },
          },
        },
      },
    },
  });
}

const hotelRepository = {
  findAll,
};

export default hotelRepository;
