import clusterFactory from "../cluster-factory";
import { forkCount } from "../config";

clusterFactory('src/express/bootstrap', forkCount)
