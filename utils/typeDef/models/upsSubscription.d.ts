import type { WorkItemModel } from "./workitemsModel";

export interface UpsSubscriptionModelConstructor {
    new (): UpsSubscriptionModel;
    public static findByWorkItem(
        workItem: WorkItemModel
    ): Promise<UpsSubscriptionModel[]>;
    public static findOneByAeTitle(
        aeTitle: string
    ): Promise<UpsSubscriptionModel>;
    public static createSubscriptionForWorkItem(
        workItem: WorkItemModel,
        aeTitle: string,
        deletionLock: boolean,
        subscribed: number
    ): Promise<UpsSubscriptionModel>;
    public static updateSubscription(
        subscription: UpsSubscriptionModel,
        workItem: WorkItemModel,
        deletionLock: boolean,
        subscribed: number
    )
    public static unsubscribe(
        aeTitle: string,
        workItem: WorkItemModel
    ): Promise<UpsSubscriptionModel>;
    public static getCountByAeTitle(
        aeTitle: string
    ): Promise<number>;
    public static deleteOneByAeTitle(
        aeTitle: string
    ): Promise<void>;
}

export interface UpsSubscriptionModel {
    aeTitle: string;
    subscribed: number;
    isDeletionLock: boolean;
}
