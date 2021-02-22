const { DateTime } = require("luxon");
const axios = require("axios");

const practitioners = require("../data/practitioners.json");
const practionerSpecialities = require("../data/practitionerSpeciality.json");

const getAvailability = (date, email) =>
  axios.get(
    `https://api.freebusy.io/beta/week/${email}?tz=Europe/London&date=${date}`
  );

const groupBySpeciality = () => {
  const map = new Map();
  practionerSpecialities.forEach((item) => {
    const key = item.practitionerId;
    const collection = map.get(key);
    if (!collection) {
      map.set(key, { specialities: [item.specialityId] });
    } else {
      collection.specialities.push(item.specialityId);
    }
  });
  return map;
};

const practionerDetails = groupBySpeciality();

practitioners.forEach((practitioner) => {
  const obj = practionerDetails.get(practitioner.practitionerId);
  return practionerDetails.set(practitioner.practitionerId, {
    ...obj,
    ...practitioner,
  });
});

const getPractitionersBySpeciality = (specialitiId) =>
  Array.from(practionerDetails.values()).filter((item) =>
    item.specialities.includes(specialitiId)
  );

const getPractitionerAvailability = async (body) => {
  const practitionerBySpeciality = getPractitionersBySpeciality(
    body.specialityId
  );

  const practitionerAvailability = await Promise.all(
    practitionerBySpeciality.map(async (practitioner) => {
      try {
        const availabilityResponse = await getAvailability(
          body.selectedDate.dateString,
          practitioner.email
        );

        const availableTimeslots = availabilityResponse.data.days.find(
          (day) => {
            return DateTime.fromISO(day.date).equals(
              DateTime.fromISO(body.selectedDate.date)
            );
          }
        );

        const findSelectedTimeSlot = availableTimeslots.timeslots.find(
          (timeslot) =>
            DateTime.fromISO(timeslot.startTime).equals(
              DateTime.fromISO(body.selectedDate.dateTime)
            )
        );

        return {
          ...practitioner,
          isAvailable: findSelectedTimeSlot.isAvailable,
        };
      } catch (e) {
        console.log("e", e);
      }
    })
  );
  return practitionerAvailability.filter(
    (practitioner) => practitioner.isAvailable
  );
};

module.exports = getPractitionerAvailability;
