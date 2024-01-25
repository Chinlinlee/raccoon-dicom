export interface UpsGlobalSubscriptionConstructor {
    new(): UpsGlobalSubscriptionModel;
    /**
     * 
     * @param query 
     * @param options 
     * @returns Cursor
     */
    public static getCursor(query: any, options: any): Promise<any>;
    public static createGlobalSubscription(
        globalSubscription: UpsGlobalSubscription
    ): Promise<UpsGlobalSubscriptionModel>;
    public static updateRepositoryInstance(
        globalSubscription: UpsGlobalSubscriptionModel
    ): Promise<UpsGlobalSubscriptionModel>;
    public static findOneByAeTitle(
        aeTitle: string
    ): Promise<UpsGlobalSubscriptionModel>;
    public static getCountByAeTitle(aeTitle: string): Promise<number>;
    public static deleteOneByAeTitle(aeTitle: string): Promise<void>;
}

export type UpsGlobalSubscription = {
    aeTitle: string;
    subscribed: number;
    queryKeys: any;
    isDeletionLock: boolean;
};

export interface UpsGlobalSubscriptionModel {}
