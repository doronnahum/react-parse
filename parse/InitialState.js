const { Record, Map } = require('immutable');

const InitialState = Record({
  collections: Map(),
  cloudCodes: Map(),
  documents: Map(),
  newDocuments: Map(),
});

export default InitialState;

/* collections / cloudCodes:
        data for each Query By target name,
          collections :{
            wine: Map({
              data : List([{...},{...}]),
              queryStatus: 'LOADING',
              info: {
                count: PropTypes.number,
                timestamp: PropTypes.number,
                page: PropTypes.number,
                skip: PropTypes.number,
              }
            }),
            travel: ....
          }
  */
/* documents:
        data for document By ObjectId,
        look like-
          documentsByObjectId :{
            A3kfi45: Map({
              data: Map(),
              queryStatus : "LOADING"
            }),
            TTGH77h: Map({....}),
          }
  */
/* documentsByUniqueIdQueryStatus:
      object Status for each Query By UniqueId,
      005f-ce-53-97-24cee4: {
        status: one.of(''LOADING','SUCCESS','ERROR),

        objectId: 'A2343fV' // after finish successfully
      }
      And when created successfully
      look like-
        categoriesDataStatusForEachCategory :{
          wine: 'SUCCESS_WITH_ZERO_RESULTS',
          travel: 'LOADING'
        }
*/
