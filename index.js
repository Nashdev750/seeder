import * as axios from "axios";
import { faker } from "@faker-js/faker";
import * as https from "https";


class DB_OPERATIONS {
    /* Create axios instance */
    INSTANCE = axios.default.create({
        /* ... other options ... */
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    });
    createRandomUser() {
        const fname = faker.person.firstName()
        const lname = faker.person.lastName()
        const email = fname+"."+lname+"@gliffinglobaltech.com"
        return {
          startDTM: faker.date.past(),
          endDTM: null,
          firstName: fname,
          lastName: lname,
          email ,
          resourceTypeId: "9c480954-f4a0-4560-ae87-9da1bf47a676",
          resourceLevelId: "b03acd5f-cc90-41ec-8b20-36ceabe7931f",
          SolutionDeliveryLeaderID: "c0ef56ff-e74a-45a5-86ce-92af60973d2d"
        };
      }
    /* Accessible fields */
    TOKEN = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN5c3RlbSIsImZ1bGxOYW1lIjoiU3lzdGVtIEFjY291bnQiLCJlbWFpbCI6InJ1bS1zeXN0ZW1AdGhoLWxsYy5jb20iLCJyb2xlIjoiU3VwZXIgQWRtaW4iLCJleHAiOjE3MDYzMzc3MjF9.gB-JXuuHe3RvSnZHH2TOgidoI6W35ypMmB25mw9m-L3euftwDYU37tNCEeOyhXtzmUQqWr-PakifundyXFhirg";
    URL = new URL("https://127.0.0.1:5001/resources");

    async SEED_DATA() {
        try {
            for (let i = 0; i < 1000; i++) {

                const payload = this.createRandomUser();

                /* Response format */
                const respose = await this.INSTANCE.post(this.URL.href, payload, {
                    headers: {
                        Authorization: `Bearer ${this.TOKEN}`,
                        Server: "Kestrel",
                        Accept: "*/*",
                    },
                });

                console.log(`RESPONSE STATUS: ${respose.status}`);
            }
        } catch (error) {
            console.log(`ERROR: ${error.message}`);
        }
    }
}

const dbContext = new DB_OPERATIONS();
dbContext.SEED_DATA();