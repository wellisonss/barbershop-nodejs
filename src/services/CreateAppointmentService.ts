import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointments';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentRepository;

  constructor(appointmentsRepository: AppointmentRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public run({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const timeConflict =
      this.appointmentsRepository.findAppointments(appointmentDate);

    if (timeConflict) {
      throw new SyntaxError('Error: time conflict');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
