/* eslint-disable no-console */
import hotelRepository from '@/repositories/hotel-repository';

export async function findAll() {
  const hotels = await hotelRepository.findAll();
  const reducedStyles = hotels.map((el) => {
    return {
      name: el.name,
      imagePath: el.imagePath,
      id: el.id,
      roomStyle: el.Room.map((el) => el.Room.name),
      numberBeds: el.Room.reduce((total, item) => item.Room.beds + total, 0),
      numberEnrollments: el.Room.filter((el) => el.EnrollmentTicket.length !== 0),
    };
  });

  const hotelsMapped = reducedStyles.map((el) => {
    const uniqueRoomStyles: string[] = [];
    el.roomStyle.forEach((c) => {
      if (!uniqueRoomStyles.includes(c)) {
        uniqueRoomStyles.push(c);
      }
    });
    const numberSlots = el.numberBeds - el.numberEnrollments.length;
    delete el.numberBeds;
    delete el.numberEnrollments;
    return {
      ...el,
      openSlots: numberSlots,
      roomStyle: uniqueRoomStyles,
    };
  });

  return hotelsMapped;
}

const hotelService = {
  findAll,
};

export default hotelService;
