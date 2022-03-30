import { Float, Resolver, Query} from "@nestjs/graphql";


@Resolver()
export class CoreResolver {
    @Query(() => Float)
    uptime() {
        return process.uptime();
    }
}