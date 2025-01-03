import Party from "../../models/Party.model.js"
import Trip from "../../models/Trip.model.js"
import DutySlip from "../../models/DutySlip.model.js"
import Vehicle from  "../../models/Vehicle.Model.js"

export const getInvoiceByParty = async (req, res) => {
    const { partyName } = req.query;
  
    try {
      
      const party = await Party.findOne({ name: partyName }).populate('rentalHistory.vehicle');
      if (!party) {
        return res.status(404).json({ error: 'Party not found' });
      }
  
      
      const trips = await Trip.find({ party: party._id })
        .populate('vehicle')
        .populate('driver');
  
      
      const vehicleIds = party.rentalHistory.map(rental => rental.vehicle._id);
      const dutySlips = await DutySlip.find({ vehicle: { $in: vehicleIds } });
  
     
      const vehicles = await Vehicle.find({ _id: { $in: vehicleIds } });
  
      const invoiceData = {
        partyDetails: {
          name: party.name,
          contactNumber: party.contactNumber,
          email: party.email,
          address: party.address,
        },
        trips,
        dutySlips,
        vehicles,
      };
  
      res.json(invoiceData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };