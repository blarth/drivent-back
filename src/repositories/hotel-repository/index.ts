import { prisma } from '@/config';

async function findAll() {
  return await prisma.hotel.findMany({
    select: {
      id: true,
      name: true,
      imagePath: true,
      Room: {
        distinct: ['styleId'],
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

async function sumBeds(hotelId: number) {
  return await prisma.roomStyle.groupBy({
    by: ['beds'],
    where: {
      Room: {},
    },
    _sum: {
      beds: true,
    },
  });
}
/* async function sumEnrollmentTicket(id: number) {
  return await prisma.enrollmentTicket.findMany({
    select: {
      _count: {
        select: {
          
        },
      },
    },
  });
} */

const hotelRepository = {
  findAll,
  sumBeds,
  /* sumEnrollmentTicket, */
};

export default hotelRepository;
