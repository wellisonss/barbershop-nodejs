import { isEqual } from 'date-fns';
import Appointment from '../models/Appointments';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

export default class AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findAppointments(date: Date): Appointment | null {
    const timeConflict = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return timeConflict || null;
  }

  public create({ date, provider }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}