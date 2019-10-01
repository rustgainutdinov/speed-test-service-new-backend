import IQueryArray from "../../interfaces/db/IQueryArray";
import googleSpeedTestQueries from "./queries_google_speed_test";
import userQueries from "./queries_user";
import domainQueries from "./queries_domain";
import speedTestServiceQueries from "./queries_speed_test_service";
import urlQueries from "./queries_url";

const queries: IQueryArray = Array.prototype.concat(googleSpeedTestQueries, userQueries, domainQueries, speedTestServiceQueries, urlQueries);

export default queries
