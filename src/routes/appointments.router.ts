import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointimentsRepository';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parseDate = startOfHour(parseISO(date));

  const timeConflict = appointmentRepository.findAppointments(parseDate);

  if (timeConflict) {
    return response.status(400).json({ message: 'Error conflito' });
  }

  const appointment = appointmentRepository.create(provider, parseDate);

  return response.json(appointment);
});

export default appointmentsRouter;
