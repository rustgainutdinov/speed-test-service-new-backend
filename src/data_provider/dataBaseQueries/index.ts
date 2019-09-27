import {IQueryArray} from "../../core/IQuery";
import {googleSpeedTestQueries} from "./queries_google_speed_test";
import {userQueries} from "./queries_user";
import {domainQueries} from "./queries_domain";
import {speedTestServiceQueries} from "./queries_speed_test_service";

const queries: IQueryArray = Array.prototype.concat(googleSpeedTestQueries, userQueries, domainQueries, speedTestServiceQueries);

export default queries
