import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import { v4 as uuid_v4 } from 'uuid';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate =
      appointmentsRepository.findByDate(appointmentDate);

    if (await findAppointmentInSameDate) {
      throw Error('Error: time conflict');
    }

    const appointment = appointmentsRepository.create({
      id: uuid_v4(),
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
