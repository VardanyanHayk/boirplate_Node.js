import Measurements from './model'
import BaseDAO from '../../baseDAO'

class MeasurementsDAO extends BaseDAO {
  constructor() {
    super(Measurements);
  }
  
}

export default MeasurementsDAO;
