import { z } from "zod"
import dbConnect from "./mongodb/client"
import UserModel, { IUser } from "./mongodb/models/User"
import bcrypt from "bcrypt"
import {
    DailyTaskDBType,
    GoogleUser,
    LoginReturnType,
    OneTimeTaskType,
    RedisUser,
    RegisterReturnType,
} from "@/lib/types"
import redis from "./redis/client"
import DailyTasksListModel, {
    DailyTasksListDBType,
} from "./mongodb/models/DailyTasksListModel"
import DailyTask, { DailyTaskMongoType } from "./mongodb/models/DailyTaskModel"
import { Types } from "mongoose"
import OnetimeTaskListModel, {
    OnetimeTaskListDBType,
} from "./mongodb/models/OnetimeTaskListModel"
import OnetimeTaskModel, {
    OnetimeDBType,
} from "./mongodb/models/OnetimeTaskModel"

const registerSchema = z.object({
    email: z.string().email("This is not a valid email."),
    password: z.string(),
    name: z.string(),
})
const loginSchema = z.object({
    email: z.string().email("This is not a valid email."),
    password: z.string(),
})

//DAILY TASK
export const getDailyTasksList = async (
    id: Types.ObjectId,
): Promise<DailyTasksListDBType> => {
    try {
        dbConnect()
        const dailyTasksList =
            await DailyTasksListModel.findById<DailyTasksListDBType>(id)

        if (!dailyTasksList) {
            throw new Error()
        }
        return dailyTasksList
    } catch (error) {
        throw new Error("Failure to get DailyTasksList")
    }
}

export const createDailyTask = async (
    taskData: DailyTaskDBType,
): Promise<DailyTaskMongoType> => {
    try {
        dbConnect()
        const newDailyTask: DailyTaskMongoType | null = await new DailyTask(
            taskData,
        )
        if (!newDailyTask) {
            throw new Error()
        }
        newDailyTask.save()
        return newDailyTask
    } catch (error) {
        throw new Error("Failed to create daily task")
    }
}

export const createDailyTasksList = async (): Promise<DailyTasksListDBType> => {
    try {
        dbConnect()
        console.log("creating...")
        const dailyTasksList: DailyTasksListDBType | null =
            await new DailyTasksListModel<{
                taskIds: Array<{
                    type: Types.ObjectId
                    ref: "DailyTask"
                }>
            }>({
                taskIds: [],
            }).save()
        if (!dailyTasksList) {
            throw new Error()
        }
        return dailyTasksList
    } catch (error) {
        console.log({ error })
        throw new Error("Failure to create DailyTasksList")
    }
}

//ONETIME TASK
export const getOnetimeTasksList = async (
    id: Types.ObjectId,
): Promise<OnetimeTaskListDBType> => {
    try {
        dbConnect()
        const onetimeTasksList =
            await OnetimeTaskListModel.findById<OnetimeTaskListDBType>(id)

        if (!onetimeTasksList) {
            throw new Error()
        }
        return onetimeTasksList
    } catch (error) {
        throw new Error("Failure to get OnetimeTasksList")
    }
}
export const createOnetimeTasksList =
    async (): Promise<OnetimeTaskListDBType> => {
        try {
            dbConnect()
            const onetimeTasksList: OnetimeTaskListDBType | null =
                await new OnetimeTaskListModel({
                    taskIds: [],
                }).save()
            if (!onetimeTasksList) {
                throw new Error()
            }
            return onetimeTasksList
        } catch (error) {
            console.log({ error })
            throw new Error("Failure to create OnetimeTaskList")
        }
    }

export const createOnetimeTask = async (
    taskData: Omit<OneTimeTaskType, "id">,
): Promise<OnetimeDBType> => {
    try {
        dbConnect()
        const onetimeTask: OnetimeDBType | null = await new OnetimeTaskModel(
            taskData,
        )
        if (!onetimeTask) {
            throw new Error()
        }
        onetimeTask.save()
        return onetimeTask
    } catch (error) {
        throw new Error("Failed to create onetime task")
    }
}

//AUTHENTICATION

export const google = async (user: GoogleUser): Promise<boolean> => {
    if (!user) return false
    try {
        const userFromRedis = await redis.get(`user:email:${user.email}`)
        if (userFromRedis) {
            return true
        }

        dbConnect()
        const existingUser = await UserModel.findOne({ email: user.email })
        if (existingUser) {
            const authTypes: Array<string> = existingUser.authType
            if (!authTypes.includes("GOOGLE")) {
                authTypes.push("GOOGLE")
                existingUser.authType = authTypes
                existingUser.save()
            }
            return true
        }
        const dailyTasksList = await createDailyTasksList()
        const onetimeTasksList = await createOnetimeTasksList()
        const newUser: IUser | null = await new UserModel({
            email: user.email,
            name: user.name,
            authType: ["GOOGLE"],
            image: user.image,
            dailyTasksListId: dailyTasksList._id,
            onetimeTasksListId: onetimeTasksList._id,
        }).save()
        if (!newUser) {
            throw new Error()
        }
        const userId: string = newUser._id.toString()
        redis.set(`user:email:${user.email}`, userId)
        redis.set(
            `user:${userId}`,
            JSON.stringify({
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                authType: ["GOOGLE"],
                dailyTasksListId: dailyTasksList._id?.toString(),
                onetimeTasksListId: onetimeTasksList._id.toString(),
            }),
        )
        return true
    } catch (error) {
        throw new Error("Database error!")
    }
}

export const register = async ({
    name,
    email,
    password,
}: z.infer<typeof registerSchema>): Promise<RegisterReturnType> => {
    try {
        //connecting to the database
        const user = await redis.get(`user:email:${email}`)
        //checking if user already exists
        if (user) {
            return { user: null, error: { message: "User already exists" } }
        }
        dbConnect()
        //hasing the password
        const hashedPassword = await bcrypt.hash(password, 10)

        const dailyTasksList = await createDailyTasksList()
        const onetimeTasksList = await createOnetimeTasksList()

        const newUser: IUser = await new UserModel({
            email: email,
            name: name,
            password: hashedPassword,
            authType: ["CRED"],
            dailyTasksListId: dailyTasksList._id,
            onetimeTasksListId: onetimeTasksList._id,
        }).save()

        const userId = newUser._id.toString()

        redis.set(`user:email:${email}`, userId)
        redis.set(
            `user:${userId}`,
            JSON.stringify({
                name,
                email,
                password: hashedPassword,
                authType: ["CRED"],
                dailyTasksListId: dailyTasksList._id?.toString() as string,
                onetimeTasksListId: onetimeTasksList._id.toString() as string,
            }),
        )
        return { user: { name: name, email, id: userId }, error: null }
    } catch (error) {
        console.log(error)
        throw new Error("Database error!")
    }
}

export const getUserIdByEmail = async (email: string): Promise<string> => {
    try {
        const userId = await redis.get<string>(`user:email:${email}`)
        if (!userId) {
            throw new Error("User not found")
        }
        return userId
    } catch (error) {
        throw new Error("Unable to find user: redis")
    }
}

export const login = async ({
    email,
    password,
}: z.infer<typeof loginSchema>): Promise<LoginReturnType> => {
    try {
        dbConnect()
        const userId = await getUserIdByEmail(email)
        if (!userId) {
            return { user: null, error: { message: "User not found" } }
        }
        const user = await redis.get<RedisUser>(`user:${userId}`)
        if (!user) {
            return { user: null, error: { message: "User not found" } }
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return { user: null, error: { message: "Invalid credentials" } }
        }

        return {
            user: { email: user.email, name: user.name, id: userId },
            error: null,
        }
    } catch (error) {
        throw new Error("Database error!")
    }
}

export const getUserById = async (userId: string): Promise<IUser> => {
    try {
        dbConnect()
        const mongoDBUser = await UserModel.findById<IUser>(userId)
        if (!mongoDBUser) {
            throw new Error("User not Identified")
        }
        return mongoDBUser
    } catch (error) {
        throw new Error("User not Identified")
    }
}

export const checkUserExistence = async ({ email }: { email: string }) => {
    try {
        dbConnect()
        const user = await UserModel.findOne<IUser>({ email })
        if (!user) {
            return false
        }
        return true
    } catch (error) {
        return false
    }
}
