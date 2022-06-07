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
    };
  });

  /* for (const hotel of reducedStyles) {
    const openSlots = await hotelRepository.sumEnrollmentTicket(hotel.id);
    return {
      ...hotel,
      openSlots,
    };
  } */

  /* const set = reducedStyles.map((el) => new Set(el.roomStyle)); */
  /* const roomStyles = hotels.map(); */
  /* const beds = await hotelRepository.sumBeds(); */
  return reducedStyles;
}

const hotelService = {
  findAll,
};

export default hotelService;
