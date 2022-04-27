import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import { uuid } from 'uuidv4';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate =
      appointmentsRepository.findByDate(appointmentDate);

    if (await findAppointmentInSameDate) {
      throw Error('Error: time conflict');
    }

    const appointment = appointmentsRepository.create({
      id: uuid(),
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
