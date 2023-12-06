import clusterFactory from "../cluster-factory";
import { forkCount } from '../config';

clusterFactory('src/node_server/bootstrap', forkCount)
