// package: vcluster.api.v1
// file: vcluster/api/v1/vcluster_api.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_field_mask_pb from "google-protobuf/google/protobuf/field_mask_pb";

export class VCluster extends jspb.Message {
    getId(): string;
    setId(value: string): VCluster;
    getName(): string;
    setName(value: string): VCluster;
    getNamespace(): string;
    setNamespace(value: string): VCluster;

    hasSpec(): boolean;
    clearSpec(): void;
    getSpec(): VClusterSpec | undefined;
    setSpec(value?: VClusterSpec): VCluster;

    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): VClusterStatus | undefined;
    setStatus(value?: VClusterStatus): VCluster;

    getLabelsMap(): jspb.Map<string, string>;
    clearLabelsMap(): void;

    getAnnotationsMap(): jspb.Map<string, string>;
    clearAnnotationsMap(): void;

    hasCreateTime(): boolean;
    clearCreateTime(): void;
    getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): VCluster;

    hasUpdateTime(): boolean;
    clearUpdateTime(): void;
    getUpdateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdateTime(value?: google_protobuf_timestamp_pb.Timestamp): VCluster;

    hasDeleteTime(): boolean;
    clearDeleteTime(): void;
    getDeleteTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setDeleteTime(value?: google_protobuf_timestamp_pb.Timestamp): VCluster;
    getOwner(): string;
    setOwner(value: string): VCluster;
    getProject(): string;
    setProject(value: string): VCluster;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VCluster.AsObject;
    static toObject(includeInstance: boolean, msg: VCluster): VCluster.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VCluster, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VCluster;
    static deserializeBinaryFromReader(message: VCluster, reader: jspb.BinaryReader): VCluster;
}

export namespace VCluster {
    export type AsObject = {
        id: string,
        name: string,
        namespace: string,
        spec?: VClusterSpec.AsObject,
        status?: VClusterStatus.AsObject,

        labelsMap: Array<[string, string]>,

        annotationsMap: Array<[string, string]>,
        createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        updateTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        deleteTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        owner: string,
        project: string,
    }
}

export class VClusterSpec extends jspb.Message {
    getKubernetesVersion(): string;
    setKubernetesVersion(value: string): VClusterSpec;

    hasResources(): boolean;
    clearResources(): void;
    getResources(): ResourceRequirements | undefined;
    setResources(value?: ResourceRequirements): VClusterSpec;
    getReplicas(): number;
    setReplicas(value: number): VClusterSpec;

    hasNetwork(): boolean;
    clearNetwork(): void;
    getNetwork(): NetworkConfig | undefined;
    setNetwork(value?: NetworkConfig): VClusterSpec;

    hasStorage(): boolean;
    clearStorage(): void;
    getStorage(): StorageConfig | undefined;
    setStorage(value?: StorageConfig): VClusterSpec;
    getEnableHa(): boolean;
    setEnableHa(value: boolean): VClusterSpec;
    getDistro(): string;
    setDistro(value: string): VClusterSpec;
    getHelmValues(): string;
    setHelmValues(value: string): VClusterSpec;

    hasSync(): boolean;
    clearSync(): void;
    getSync(): SyncConfig | undefined;
    setSync(value?: SyncConfig): VClusterSpec;
    clearPluginsList(): void;
    getPluginsList(): Array<PluginConfig>;
    setPluginsList(value: Array<PluginConfig>): VClusterSpec;
    addPlugins(value?: PluginConfig, index?: number): PluginConfig;

    hasIngress(): boolean;
    clearIngress(): void;
    getIngress(): IngressConfig | undefined;
    setIngress(value?: IngressConfig): VClusterSpec;

    hasServiceAccount(): boolean;
    clearServiceAccount(): void;
    getServiceAccount(): ServiceAccountConfig | undefined;
    setServiceAccount(value?: ServiceAccountConfig): VClusterSpec;
    getIsolationMode(): string;
    setIsolationMode(value: string): VClusterSpec;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VClusterSpec.AsObject;
    static toObject(includeInstance: boolean, msg: VClusterSpec): VClusterSpec.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VClusterSpec, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VClusterSpec;
    static deserializeBinaryFromReader(message: VClusterSpec, reader: jspb.BinaryReader): VClusterSpec;
}

export namespace VClusterSpec {
    export type AsObject = {
        kubernetesVersion: string,
        resources?: ResourceRequirements.AsObject,
        replicas: number,
        network?: NetworkConfig.AsObject,
        storage?: StorageConfig.AsObject,
        enableHa: boolean,
        distro: string,
        helmValues: string,
        sync?: SyncConfig.AsObject,
        pluginsList: Array<PluginConfig.AsObject>,
        ingress?: IngressConfig.AsObject,
        serviceAccount?: ServiceAccountConfig.AsObject,
        isolationMode: string,
    }
}

export class VClusterStatus extends jspb.Message {
    getPhase(): Phase;
    setPhase(value: Phase): VClusterStatus;
    getMessage(): string;
    setMessage(value: string): VClusterStatus;
    getReason(): string;
    setReason(value: string): VClusterStatus;
    clearConditionsList(): void;
    getConditionsList(): Array<Condition>;
    setConditionsList(value: Array<Condition>): VClusterStatus;
    addConditions(value?: Condition, index?: number): Condition;
    getKubeconfig(): string;
    setKubeconfig(value: string): VClusterStatus;
    getApiServerEndpoint(): string;
    setApiServerEndpoint(value: string): VClusterStatus;

    hasCurrentUsage(): boolean;
    clearCurrentUsage(): void;
    getCurrentUsage(): ResourceUsage | undefined;
    setCurrentUsage(value?: ResourceUsage): VClusterStatus;
    getReadyReplicas(): number;
    setReadyReplicas(value: number): VClusterStatus;
    getTotalReplicas(): number;
    setTotalReplicas(value: number): VClusterStatus;

    hasReadyTime(): boolean;
    clearReadyTime(): void;
    getReadyTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setReadyTime(value?: google_protobuf_timestamp_pb.Timestamp): VClusterStatus;

    hasLastSnapshot(): boolean;
    clearLastSnapshot(): void;
    getLastSnapshot(): SnapshotInfo | undefined;
    setLastSnapshot(value?: SnapshotInfo): VClusterStatus;

    hasHelmRelease(): boolean;
    clearHelmRelease(): void;
    getHelmRelease(): HelmReleaseInfo | undefined;
    setHelmRelease(value?: HelmReleaseInfo): VClusterStatus;
    getObservedGeneration(): number;
    setObservedGeneration(value: number): VClusterStatus;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VClusterStatus.AsObject;
    static toObject(includeInstance: boolean, msg: VClusterStatus): VClusterStatus.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VClusterStatus, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VClusterStatus;
    static deserializeBinaryFromReader(message: VClusterStatus, reader: jspb.BinaryReader): VClusterStatus;
}

export namespace VClusterStatus {
    export type AsObject = {
        phase: Phase,
        message: string,
        reason: string,
        conditionsList: Array<Condition.AsObject>,
        kubeconfig: string,
        apiServerEndpoint: string,
        currentUsage?: ResourceUsage.AsObject,
        readyReplicas: number,
        totalReplicas: number,
        readyTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        lastSnapshot?: SnapshotInfo.AsObject,
        helmRelease?: HelmReleaseInfo.AsObject,
        observedGeneration: number,
    }
}

export class ResourceRequirements extends jspb.Message {
    getCpuRequest(): string;
    setCpuRequest(value: string): ResourceRequirements;
    getCpuLimit(): string;
    setCpuLimit(value: string): ResourceRequirements;
    getMemoryRequest(): string;
    setMemoryRequest(value: string): ResourceRequirements;
    getMemoryLimit(): string;
    setMemoryLimit(value: string): ResourceRequirements;
    getEphemeralStorageRequest(): string;
    setEphemeralStorageRequest(value: string): ResourceRequirements;
    getEphemeralStorageLimit(): string;
    setEphemeralStorageLimit(value: string): ResourceRequirements;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResourceRequirements.AsObject;
    static toObject(includeInstance: boolean, msg: ResourceRequirements): ResourceRequirements.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResourceRequirements, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResourceRequirements;
    static deserializeBinaryFromReader(message: ResourceRequirements, reader: jspb.BinaryReader): ResourceRequirements;
}

export namespace ResourceRequirements {
    export type AsObject = {
        cpuRequest: string,
        cpuLimit: string,
        memoryRequest: string,
        memoryLimit: string,
        ephemeralStorageRequest: string,
        ephemeralStorageLimit: string,
    }
}

export class ResourceUsage extends jspb.Message {
    getCpuUsage(): string;
    setCpuUsage(value: string): ResourceUsage;
    getMemoryUsage(): string;
    setMemoryUsage(value: string): ResourceUsage;
    getStorageUsage(): string;
    setStorageUsage(value: string): ResourceUsage;
    getPodCount(): number;
    setPodCount(value: number): ResourceUsage;
    getNamespaceCount(): number;
    setNamespaceCount(value: number): ResourceUsage;
    getServiceCount(): number;
    setServiceCount(value: number): ResourceUsage;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResourceUsage.AsObject;
    static toObject(includeInstance: boolean, msg: ResourceUsage): ResourceUsage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResourceUsage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResourceUsage;
    static deserializeBinaryFromReader(message: ResourceUsage, reader: jspb.BinaryReader): ResourceUsage;
}

export namespace ResourceUsage {
    export type AsObject = {
        cpuUsage: string,
        memoryUsage: string,
        storageUsage: string,
        podCount: number,
        namespaceCount: number,
        serviceCount: number,
    }
}

export class NetworkConfig extends jspb.Message {
    getPodCidr(): string;
    setPodCidr(value: string): NetworkConfig;
    getServiceCidr(): string;
    setServiceCidr(value: string): NetworkConfig;
    getEnableNetworkPolicies(): boolean;
    setEnableNetworkPolicies(value: boolean): NetworkConfig;
    getDnsServiceIp(): string;
    setDnsServiceIp(value: string): NetworkConfig;

    hasDns(): boolean;
    clearDns(): void;
    getDns(): DNSConfig | undefined;
    setDns(value?: DNSConfig): NetworkConfig;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NetworkConfig.AsObject;
    static toObject(includeInstance: boolean, msg: NetworkConfig): NetworkConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NetworkConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NetworkConfig;
    static deserializeBinaryFromReader(message: NetworkConfig, reader: jspb.BinaryReader): NetworkConfig;
}

export namespace NetworkConfig {
    export type AsObject = {
        podCidr: string,
        serviceCidr: string,
        enableNetworkPolicies: boolean,
        dnsServiceIp: string,
        dns?: DNSConfig.AsObject,
    }
}

export class DNSConfig extends jspb.Message {
    clearNameserversList(): void;
    getNameserversList(): Array<string>;
    setNameserversList(value: Array<string>): DNSConfig;
    addNameservers(value: string, index?: number): string;
    clearSearchesList(): void;
    getSearchesList(): Array<string>;
    setSearchesList(value: Array<string>): DNSConfig;
    addSearches(value: string, index?: number): string;
    clearOptionsList(): void;
    getOptionsList(): Array<string>;
    setOptionsList(value: Array<string>): DNSConfig;
    addOptions(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DNSConfig.AsObject;
    static toObject(includeInstance: boolean, msg: DNSConfig): DNSConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DNSConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DNSConfig;
    static deserializeBinaryFromReader(message: DNSConfig, reader: jspb.BinaryReader): DNSConfig;
}

export namespace DNSConfig {
    export type AsObject = {
        nameserversList: Array<string>,
        searchesList: Array<string>,
        optionsList: Array<string>,
    }
}

export class StorageConfig extends jspb.Message {
    getDefaultStorageClass(): string;
    setDefaultStorageClass(value: string): StorageConfig;
    getEnablePersistence(): boolean;
    setEnablePersistence(value: boolean): StorageConfig;
    getPersistenceSize(): string;
    setPersistenceSize(value: string): StorageConfig;
    getPersistenceStorageClass(): string;
    setPersistenceStorageClass(value: string): StorageConfig;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StorageConfig.AsObject;
    static toObject(includeInstance: boolean, msg: StorageConfig): StorageConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StorageConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StorageConfig;
    static deserializeBinaryFromReader(message: StorageConfig, reader: jspb.BinaryReader): StorageConfig;
}

export namespace StorageConfig {
    export type AsObject = {
        defaultStorageClass: string,
        enablePersistence: boolean,
        persistenceSize: string,
        persistenceStorageClass: string,
    }
}

export class SyncConfig extends jspb.Message {
    getSyncNodes(): boolean;
    setSyncNodes(value: boolean): SyncConfig;
    getSyncPersistentVolumes(): boolean;
    setSyncPersistentVolumes(value: boolean): SyncConfig;
    getSyncStorageClasses(): boolean;
    setSyncStorageClasses(value: boolean): SyncConfig;
    getSyncIngresses(): boolean;
    setSyncIngresses(value: boolean): SyncConfig;
    getSyncPriorityClasses(): boolean;
    setSyncPriorityClasses(value: boolean): SyncConfig;
    getSyncNetworkPolicies(): boolean;
    setSyncNetworkPolicies(value: boolean): SyncConfig;
    getSyncPodDisruptionBudgets(): boolean;
    setSyncPodDisruptionBudgets(value: boolean): SyncConfig;
    clearCustomResourcesList(): void;
    getCustomResourcesList(): Array<string>;
    setCustomResourcesList(value: Array<string>): SyncConfig;
    addCustomResources(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SyncConfig.AsObject;
    static toObject(includeInstance: boolean, msg: SyncConfig): SyncConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SyncConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SyncConfig;
    static deserializeBinaryFromReader(message: SyncConfig, reader: jspb.BinaryReader): SyncConfig;
}

export namespace SyncConfig {
    export type AsObject = {
        syncNodes: boolean,
        syncPersistentVolumes: boolean,
        syncStorageClasses: boolean,
        syncIngresses: boolean,
        syncPriorityClasses: boolean,
        syncNetworkPolicies: boolean,
        syncPodDisruptionBudgets: boolean,
        customResourcesList: Array<string>,
    }
}

export class PluginConfig extends jspb.Message {
    getName(): string;
    setName(value: string): PluginConfig;
    getVersion(): string;
    setVersion(value: string): PluginConfig;
    getConfig(): string;
    setConfig(value: string): PluginConfig;
    getEnabled(): boolean;
    setEnabled(value: boolean): PluginConfig;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PluginConfig.AsObject;
    static toObject(includeInstance: boolean, msg: PluginConfig): PluginConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PluginConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PluginConfig;
    static deserializeBinaryFromReader(message: PluginConfig, reader: jspb.BinaryReader): PluginConfig;
}

export namespace PluginConfig {
    export type AsObject = {
        name: string,
        version: string,
        config: string,
        enabled: boolean,
    }
}

export class IngressConfig extends jspb.Message {
    getEnabled(): boolean;
    setEnabled(value: boolean): IngressConfig;
    getIngressClass(): string;
    setIngressClass(value: string): IngressConfig;
    getHostname(): string;
    setHostname(value: string): IngressConfig;

    hasTls(): boolean;
    clearTls(): void;
    getTls(): TLSConfig | undefined;
    setTls(value?: TLSConfig): IngressConfig;

    getAnnotationsMap(): jspb.Map<string, string>;
    clearAnnotationsMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IngressConfig.AsObject;
    static toObject(includeInstance: boolean, msg: IngressConfig): IngressConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: IngressConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IngressConfig;
    static deserializeBinaryFromReader(message: IngressConfig, reader: jspb.BinaryReader): IngressConfig;
}

export namespace IngressConfig {
    export type AsObject = {
        enabled: boolean,
        ingressClass: string,
        hostname: string,
        tls?: TLSConfig.AsObject,

        annotationsMap: Array<[string, string]>,
    }
}

export class TLSConfig extends jspb.Message {
    getEnabled(): boolean;
    setEnabled(value: boolean): TLSConfig;
    getSecretName(): string;
    setSecretName(value: string): TLSConfig;
    getUseCertManager(): boolean;
    setUseCertManager(value: boolean): TLSConfig;
    getIssuerName(): string;
    setIssuerName(value: string): TLSConfig;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TLSConfig.AsObject;
    static toObject(includeInstance: boolean, msg: TLSConfig): TLSConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TLSConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TLSConfig;
    static deserializeBinaryFromReader(message: TLSConfig, reader: jspb.BinaryReader): TLSConfig;
}

export namespace TLSConfig {
    export type AsObject = {
        enabled: boolean,
        secretName: string,
        useCertManager: boolean,
        issuerName: string,
    }
}

export class ServiceAccountConfig extends jspb.Message {
    getName(): string;
    setName(value: string): ServiceAccountConfig;

    getAnnotationsMap(): jspb.Map<string, string>;
    clearAnnotationsMap(): void;
    getAutomountToken(): boolean;
    setAutomountToken(value: boolean): ServiceAccountConfig;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ServiceAccountConfig.AsObject;
    static toObject(includeInstance: boolean, msg: ServiceAccountConfig): ServiceAccountConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ServiceAccountConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ServiceAccountConfig;
    static deserializeBinaryFromReader(message: ServiceAccountConfig, reader: jspb.BinaryReader): ServiceAccountConfig;
}

export namespace ServiceAccountConfig {
    export type AsObject = {
        name: string,

        annotationsMap: Array<[string, string]>,
        automountToken: boolean,
    }
}

export class Condition extends jspb.Message {
    getType(): string;
    setType(value: string): Condition;
    getStatus(): string;
    setStatus(value: string): Condition;
    getReason(): string;
    setReason(value: string): Condition;
    getMessage(): string;
    setMessage(value: string): Condition;

    hasLastTransitionTime(): boolean;
    clearLastTransitionTime(): void;
    getLastTransitionTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setLastTransitionTime(value?: google_protobuf_timestamp_pb.Timestamp): Condition;

    hasLastProbeTime(): boolean;
    clearLastProbeTime(): void;
    getLastProbeTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setLastProbeTime(value?: google_protobuf_timestamp_pb.Timestamp): Condition;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Condition.AsObject;
    static toObject(includeInstance: boolean, msg: Condition): Condition.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Condition, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Condition;
    static deserializeBinaryFromReader(message: Condition, reader: jspb.BinaryReader): Condition;
}

export namespace Condition {
    export type AsObject = {
        type: string,
        status: string,
        reason: string,
        message: string,
        lastTransitionTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        lastProbeTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class SnapshotInfo extends jspb.Message {
    getId(): string;
    setId(value: string): SnapshotInfo;
    getName(): string;
    setName(value: string): SnapshotInfo;

    hasCreateTime(): boolean;
    clearCreateTime(): void;
    getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): SnapshotInfo;
    getSizeBytes(): number;
    setSizeBytes(value: number): SnapshotInfo;
    getStatus(): string;
    setStatus(value: string): SnapshotInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnapshotInfo.AsObject;
    static toObject(includeInstance: boolean, msg: SnapshotInfo): SnapshotInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnapshotInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnapshotInfo;
    static deserializeBinaryFromReader(message: SnapshotInfo, reader: jspb.BinaryReader): SnapshotInfo;
}

export namespace SnapshotInfo {
    export type AsObject = {
        id: string,
        name: string,
        createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        sizeBytes: number,
        status: string,
    }
}

export class HelmReleaseInfo extends jspb.Message {
    getName(): string;
    setName(value: string): HelmReleaseInfo;
    getChartVersion(): string;
    setChartVersion(value: string): HelmReleaseInfo;
    getAppVersion(): string;
    setAppVersion(value: string): HelmReleaseInfo;
    getStatus(): string;
    setStatus(value: string): HelmReleaseInfo;
    getRevision(): number;
    setRevision(value: number): HelmReleaseInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HelmReleaseInfo.AsObject;
    static toObject(includeInstance: boolean, msg: HelmReleaseInfo): HelmReleaseInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HelmReleaseInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HelmReleaseInfo;
    static deserializeBinaryFromReader(message: HelmReleaseInfo, reader: jspb.BinaryReader): HelmReleaseInfo;
}

export namespace HelmReleaseInfo {
    export type AsObject = {
        name: string,
        chartVersion: string,
        appVersion: string,
        status: string,
        revision: number,
    }
}

export class Snapshot extends jspb.Message {
    getId(): string;
    setId(value: string): Snapshot;
    getName(): string;
    setName(value: string): Snapshot;
    getVclusterId(): string;
    setVclusterId(value: string): Snapshot;
    getVclusterName(): string;
    setVclusterName(value: string): Snapshot;
    getNamespace(): string;
    setNamespace(value: string): Snapshot;
    getStatus(): SnapshotStatus;
    setStatus(value: SnapshotStatus): Snapshot;
    getSizeBytes(): number;
    setSizeBytes(value: number): Snapshot;

    hasCreateTime(): boolean;
    clearCreateTime(): void;
    getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): Snapshot;

    hasExpireTime(): boolean;
    clearExpireTime(): void;
    getExpireTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setExpireTime(value?: google_protobuf_timestamp_pb.Timestamp): Snapshot;

    getLabelsMap(): jspb.Map<string, string>;
    clearLabelsMap(): void;
    getDescription(): string;
    setDescription(value: string): Snapshot;
    getStorageUri(): string;
    setStorageUri(value: string): Snapshot;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Snapshot.AsObject;
    static toObject(includeInstance: boolean, msg: Snapshot): Snapshot.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Snapshot, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Snapshot;
    static deserializeBinaryFromReader(message: Snapshot, reader: jspb.BinaryReader): Snapshot;
}

export namespace Snapshot {
    export type AsObject = {
        id: string,
        name: string,
        vclusterId: string,
        vclusterName: string,
        namespace: string,
        status: SnapshotStatus,
        sizeBytes: number,
        createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        expireTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,

        labelsMap: Array<[string, string]>,
        description: string,
        storageUri: string,
    }
}

export class CreateVClusterRequest extends jspb.Message {
    getName(): string;
    setName(value: string): CreateVClusterRequest;
    getNamespace(): string;
    setNamespace(value: string): CreateVClusterRequest;

    hasSpec(): boolean;
    clearSpec(): void;
    getSpec(): VClusterSpec | undefined;
    setSpec(value?: VClusterSpec): CreateVClusterRequest;

    getLabelsMap(): jspb.Map<string, string>;
    clearLabelsMap(): void;
    getRequestId(): string;
    setRequestId(value: string): CreateVClusterRequest;
    getWaitForReady(): boolean;
    setWaitForReady(value: boolean): CreateVClusterRequest;
    getTimeoutSeconds(): number;
    setTimeoutSeconds(value: number): CreateVClusterRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateVClusterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateVClusterRequest): CreateVClusterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateVClusterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateVClusterRequest;
    static deserializeBinaryFromReader(message: CreateVClusterRequest, reader: jspb.BinaryReader): CreateVClusterRequest;
}

export namespace CreateVClusterRequest {
    export type AsObject = {
        name: string,
        namespace: string,
        spec?: VClusterSpec.AsObject,

        labelsMap: Array<[string, string]>,
        requestId: string,
        waitForReady: boolean,
        timeoutSeconds: number,
    }
}

export class CreateVClusterResponse extends jspb.Message {

    hasVcluster(): boolean;
    clearVcluster(): void;
    getVcluster(): VCluster | undefined;
    setVcluster(value?: VCluster): CreateVClusterResponse;
    getOperationId(): string;
    setOperationId(value: string): CreateVClusterResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateVClusterResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateVClusterResponse): CreateVClusterResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateVClusterResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateVClusterResponse;
    static deserializeBinaryFromReader(message: CreateVClusterResponse, reader: jspb.BinaryReader): CreateVClusterResponse;
}

export namespace CreateVClusterResponse {
    export type AsObject = {
        vcluster?: VCluster.AsObject,
        operationId: string,
    }
}

export class GetVClusterRequest extends jspb.Message {
    getName(): string;
    setName(value: string): GetVClusterRequest;
    getNamespace(): string;
    setNamespace(value: string): GetVClusterRequest;
    getId(): string;
    setId(value: string): GetVClusterRequest;
    getIncludeKubeconfig(): boolean;
    setIncludeKubeconfig(value: boolean): GetVClusterRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetVClusterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetVClusterRequest): GetVClusterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetVClusterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetVClusterRequest;
    static deserializeBinaryFromReader(message: GetVClusterRequest, reader: jspb.BinaryReader): GetVClusterRequest;
}

export namespace GetVClusterRequest {
    export type AsObject = {
        name: string,
        namespace: string,
        id: string,
        includeKubeconfig: boolean,
    }
}

export class GetVClusterResponse extends jspb.Message {

    hasVcluster(): boolean;
    clearVcluster(): void;
    getVcluster(): VCluster | undefined;
    setVcluster(value?: VCluster): GetVClusterResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetVClusterResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetVClusterResponse): GetVClusterResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetVClusterResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetVClusterResponse;
    static deserializeBinaryFromReader(message: GetVClusterResponse, reader: jspb.BinaryReader): GetVClusterResponse;
}

export namespace GetVClusterResponse {
    export type AsObject = {
        vcluster?: VCluster.AsObject,
    }
}

export class ListVClustersRequest extends jspb.Message {
    getNamespace(): string;
    setNamespace(value: string): ListVClustersRequest;
    getPageSize(): number;
    setPageSize(value: number): ListVClustersRequest;
    getPageToken(): string;
    setPageToken(value: string): ListVClustersRequest;
    getLabelSelector(): string;
    setLabelSelector(value: string): ListVClustersRequest;
    clearPhasesList(): void;
    getPhasesList(): Array<Phase>;
    setPhasesList(value: Array<Phase>): ListVClustersRequest;
    addPhases(value: Phase, index?: number): Phase;
    getOwner(): string;
    setOwner(value: string): ListVClustersRequest;
    getProject(): string;
    setProject(value: string): ListVClustersRequest;
    getOrderBy(): string;
    setOrderBy(value: string): ListVClustersRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListVClustersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListVClustersRequest): ListVClustersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListVClustersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListVClustersRequest;
    static deserializeBinaryFromReader(message: ListVClustersRequest, reader: jspb.BinaryReader): ListVClustersRequest;
}

export namespace ListVClustersRequest {
    export type AsObject = {
        namespace: string,
        pageSize: number,
        pageToken: string,
        labelSelector: string,
        phasesList: Array<Phase>,
        owner: string,
        project: string,
        orderBy: string,
    }
}

export class ListVClustersResponse extends jspb.Message {
    clearVclustersList(): void;
    getVclustersList(): Array<VCluster>;
    setVclustersList(value: Array<VCluster>): ListVClustersResponse;
    addVclusters(value?: VCluster, index?: number): VCluster;
    getNextPageToken(): string;
    setNextPageToken(value: string): ListVClustersResponse;
    getTotalCount(): number;
    setTotalCount(value: number): ListVClustersResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListVClustersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListVClustersResponse): ListVClustersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListVClustersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListVClustersResponse;
    static deserializeBinaryFromReader(message: ListVClustersResponse, reader: jspb.BinaryReader): ListVClustersResponse;
}

export namespace ListVClustersResponse {
    export type AsObject = {
        vclustersList: Array<VCluster.AsObject>,
        nextPageToken: string,
        totalCount: number,
    }
}

export class UpdateVClusterRequest extends jspb.Message {
    getName(): string;
    setName(value: string): UpdateVClusterRequest;
    getNamespace(): string;
    setNamespace(value: string): UpdateVClusterRequest;

    hasSpec(): boolean;
    clearSpec(): void;
    getSpec(): VClusterSpec | undefined;
    setSpec(value?: VClusterSpec): UpdateVClusterRequest;

    hasUpdateMask(): boolean;
    clearUpdateMask(): void;
    getUpdateMask(): google_protobuf_field_mask_pb.FieldMask | undefined;
    setUpdateMask(value?: google_protobuf_field_mask_pb.FieldMask): UpdateVClusterRequest;

    getLabelsMap(): jspb.Map<string, string>;
    clearLabelsMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateVClusterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateVClusterRequest): UpdateVClusterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateVClusterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateVClusterRequest;
    static deserializeBinaryFromReader(message: UpdateVClusterRequest, reader: jspb.BinaryReader): UpdateVClusterRequest;
}

export namespace UpdateVClusterRequest {
    export type AsObject = {
        name: string,
        namespace: string,
        spec?: VClusterSpec.AsObject,
        updateMask?: google_protobuf_field_mask_pb.FieldMask.AsObject,

        labelsMap: Array<[string, string]>,
    }
}

export class UpdateVClusterResponse extends jspb.Message {

    hasVcluster(): boolean;
    clearVcluster(): void;
    getVcluster(): VCluster | undefined;
    setVcluster(value?: VCluster): UpdateVClusterResponse;
    getOperationId(): string;
    setOperationId(value: string): UpdateVClusterResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateVClusterResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateVClusterResponse): UpdateVClusterResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateVClusterResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateVClusterResponse;
    static deserializeBinaryFromReader(message: UpdateVClusterResponse, reader: jspb.BinaryReader): UpdateVClusterResponse;
}

export namespace UpdateVClusterResponse {
    export type AsObject = {
        vcluster?: VCluster.AsObject,
        operationId: string,
    }
}

export class DeleteVClusterRequest extends jspb.Message {
    getName(): string;
    setName(value: string): DeleteVClusterRequest;
    getNamespace(): string;
    setNamespace(value: string): DeleteVClusterRequest;
    getForce(): boolean;
    setForce(value: boolean): DeleteVClusterRequest;
    getDeleteSnapshots(): boolean;
    setDeleteSnapshots(value: boolean): DeleteVClusterRequest;
    getGracePeriodSeconds(): number;
    setGracePeriodSeconds(value: number): DeleteVClusterRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteVClusterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteVClusterRequest): DeleteVClusterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteVClusterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteVClusterRequest;
    static deserializeBinaryFromReader(message: DeleteVClusterRequest, reader: jspb.BinaryReader): DeleteVClusterRequest;
}

export namespace DeleteVClusterRequest {
    export type AsObject = {
        name: string,
        namespace: string,
        force: boolean,
        deleteSnapshots: boolean,
        gracePeriodSeconds: number,
    }
}

export class DeleteVClusterResponse extends jspb.Message {
    getOperationId(): string;
    setOperationId(value: string): DeleteVClusterResponse;

    hasDeleteTime(): boolean;
    clearDeleteTime(): void;
    getDeleteTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setDeleteTime(value?: google_protobuf_timestamp_pb.Timestamp): DeleteVClusterResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteVClusterResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteVClusterResponse): DeleteVClusterResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteVClusterResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteVClusterResponse;
    static deserializeBinaryFromReader(message: DeleteVClusterResponse, reader: jspb.BinaryReader): DeleteVClusterResponse;
}

export namespace DeleteVClusterResponse {
    export type AsObject = {
        operationId: string,
        deleteTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class ScaleVClusterRequest extends jspb.Message {
    getName(): string;
    setName(value: string): ScaleVClusterRequest;
    getNamespace(): string;
    setNamespace(value: string): ScaleVClusterRequest;

    hasResources(): boolean;
    clearResources(): void;
    getResources(): ResourceRequirements | undefined;
    setResources(value?: ResourceRequirements): ScaleVClusterRequest;
    getReplicas(): number;
    setReplicas(value: number): ScaleVClusterRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ScaleVClusterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ScaleVClusterRequest): ScaleVClusterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ScaleVClusterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ScaleVClusterRequest;
    static deserializeBinaryFromReader(message: ScaleVClusterRequest, reader: jspb.BinaryReader): ScaleVClusterRequest;
}

export namespace ScaleVClusterRequest {
    export type AsObject = {
        name: string,
        namespace: string,
        resources?: ResourceRequirements.AsObject,
        replicas: number,
    }
}

export class ScaleVClusterResponse extends jspb.Message {

    hasVcluster(): boolean;
    clearVcluster(): void;
    getVcluster(): VCluster | undefined;
    setVcluster(value?: VCluster): ScaleVClusterResponse;
    getOperationId(): string;
    setOperationId(value: string): ScaleVClusterResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ScaleVClusterResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ScaleVClusterResponse): ScaleVClusterResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ScaleVClusterResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ScaleVClusterResponse;
    static deserializeBinaryFromReader(message: ScaleVClusterResponse, reader: jspb.BinaryReader): ScaleVClusterResponse;
}

export namespace ScaleVClusterResponse {
    export type AsObject = {
        vcluster?: VCluster.AsObject,
        operationId: string,
    }
}

export class SuspendVClusterRequest extends jspb.Message {
    getName(): string;
    setName(value: string): SuspendVClusterRequest;
    getNamespace(): string;
    setNamespace(value: string): SuspendVClusterRequest;
    getDrainWorkloads(): boolean;
    setDrainWorkloads(value: boolean): SuspendVClusterRequest;
    getDrainTimeoutSeconds(): number;
    setDrainTimeoutSeconds(value: number): SuspendVClusterRequest;
    getCreateSnapshot(): boolean;
    setCreateSnapshot(value: boolean): SuspendVClusterRequest;
    getSnapshotName(): string;
    setSnapshotName(value: string): SuspendVClusterRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SuspendVClusterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SuspendVClusterRequest): SuspendVClusterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SuspendVClusterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SuspendVClusterRequest;
    static deserializeBinaryFromReader(message: SuspendVClusterRequest, reader: jspb.BinaryReader): SuspendVClusterRequest;
}

export namespace SuspendVClusterRequest {
    export type AsObject = {
        name: string,
        namespace: string,
        drainWorkloads: boolean,
        drainTimeoutSeconds: number,
        createSnapshot: boolean,
        snapshotName: string,
    }
}

export class SuspendVClusterResponse extends jspb.Message {

    hasVcluster(): boolean;
    clearVcluster(): void;
    getVcluster(): VCluster | undefined;
    setVcluster(value?: VCluster): SuspendVClusterResponse;

    hasSnapshot(): boolean;
    clearSnapshot(): void;
    getSnapshot(): Snapshot | undefined;
    setSnapshot(value?: Snapshot): SuspendVClusterResponse;
    getOperationId(): string;
    setOperationId(value: string): SuspendVClusterResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SuspendVClusterResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SuspendVClusterResponse): SuspendVClusterResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SuspendVClusterResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SuspendVClusterResponse;
    static deserializeBinaryFromReader(message: SuspendVClusterResponse, reader: jspb.BinaryReader): SuspendVClusterResponse;
}

export namespace SuspendVClusterResponse {
    export type AsObject = {
        vcluster?: VCluster.AsObject,
        snapshot?: Snapshot.AsObject,
        operationId: string,
    }
}

export class ResumeVClusterRequest extends jspb.Message {
    getName(): string;
    setName(value: string): ResumeVClusterRequest;
    getNamespace(): string;
    setNamespace(value: string): ResumeVClusterRequest;
    getReconcileWorkloads(): boolean;
    setReconcileWorkloads(value: boolean): ResumeVClusterRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResumeVClusterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ResumeVClusterRequest): ResumeVClusterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResumeVClusterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResumeVClusterRequest;
    static deserializeBinaryFromReader(message: ResumeVClusterRequest, reader: jspb.BinaryReader): ResumeVClusterRequest;
}

export namespace ResumeVClusterRequest {
    export type AsObject = {
        name: string,
        namespace: string,
        reconcileWorkloads: boolean,
    }
}

export class ResumeVClusterResponse extends jspb.Message {

    hasVcluster(): boolean;
    clearVcluster(): void;
    getVcluster(): VCluster | undefined;
    setVcluster(value?: VCluster): ResumeVClusterResponse;
    getOperationId(): string;
    setOperationId(value: string): ResumeVClusterResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResumeVClusterResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ResumeVClusterResponse): ResumeVClusterResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResumeVClusterResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResumeVClusterResponse;
    static deserializeBinaryFromReader(message: ResumeVClusterResponse, reader: jspb.BinaryReader): ResumeVClusterResponse;
}

export namespace ResumeVClusterResponse {
    export type AsObject = {
        vcluster?: VCluster.AsObject,
        operationId: string,
    }
}

export class SnapshotVClusterRequest extends jspb.Message {
    getName(): string;
    setName(value: string): SnapshotVClusterRequest;
    getNamespace(): string;
    setNamespace(value: string): SnapshotVClusterRequest;
    getSnapshotName(): string;
    setSnapshotName(value: string): SnapshotVClusterRequest;
    getDescription(): string;
    setDescription(value: string): SnapshotVClusterRequest;
    getRetentionHours(): number;
    setRetentionHours(value: number): SnapshotVClusterRequest;

    getLabelsMap(): jspb.Map<string, string>;
    clearLabelsMap(): void;
    getIncludeWorkloads(): boolean;
    setIncludeWorkloads(value: boolean): SnapshotVClusterRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnapshotVClusterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SnapshotVClusterRequest): SnapshotVClusterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnapshotVClusterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnapshotVClusterRequest;
    static deserializeBinaryFromReader(message: SnapshotVClusterRequest, reader: jspb.BinaryReader): SnapshotVClusterRequest;
}

export namespace SnapshotVClusterRequest {
    export type AsObject = {
        name: string,
        namespace: string,
        snapshotName: string,
        description: string,
        retentionHours: number,

        labelsMap: Array<[string, string]>,
        includeWorkloads: boolean,
    }
}

export class SnapshotVClusterResponse extends jspb.Message {

    hasSnapshot(): boolean;
    clearSnapshot(): void;
    getSnapshot(): Snapshot | undefined;
    setSnapshot(value?: Snapshot): SnapshotVClusterResponse;
    getOperationId(): string;
    setOperationId(value: string): SnapshotVClusterResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SnapshotVClusterResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SnapshotVClusterResponse): SnapshotVClusterResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SnapshotVClusterResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SnapshotVClusterResponse;
    static deserializeBinaryFromReader(message: SnapshotVClusterResponse, reader: jspb.BinaryReader): SnapshotVClusterResponse;
}

export namespace SnapshotVClusterResponse {
    export type AsObject = {
        snapshot?: Snapshot.AsObject,
        operationId: string,
    }
}

export class RestoreVClusterRequest extends jspb.Message {
    getName(): string;
    setName(value: string): RestoreVClusterRequest;
    getNamespace(): string;
    setNamespace(value: string): RestoreVClusterRequest;
    getSnapshotId(): string;
    setSnapshotId(value: string): RestoreVClusterRequest;
    getCreateNew(): boolean;
    setCreateNew(value: boolean): RestoreVClusterRequest;
    getNewName(): string;
    setNewName(value: string): RestoreVClusterRequest;
    getNewNamespace(): string;
    setNewNamespace(value: string): RestoreVClusterRequest;
    getRestoreWorkloads(): boolean;
    setRestoreWorkloads(value: boolean): RestoreVClusterRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RestoreVClusterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RestoreVClusterRequest): RestoreVClusterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RestoreVClusterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RestoreVClusterRequest;
    static deserializeBinaryFromReader(message: RestoreVClusterRequest, reader: jspb.BinaryReader): RestoreVClusterRequest;
}

export namespace RestoreVClusterRequest {
    export type AsObject = {
        name: string,
        namespace: string,
        snapshotId: string,
        createNew: boolean,
        newName: string,
        newNamespace: string,
        restoreWorkloads: boolean,
    }
}

export class RestoreVClusterResponse extends jspb.Message {

    hasVcluster(): boolean;
    clearVcluster(): void;
    getVcluster(): VCluster | undefined;
    setVcluster(value?: VCluster): RestoreVClusterResponse;
    getOperationId(): string;
    setOperationId(value: string): RestoreVClusterResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RestoreVClusterResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RestoreVClusterResponse): RestoreVClusterResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RestoreVClusterResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RestoreVClusterResponse;
    static deserializeBinaryFromReader(message: RestoreVClusterResponse, reader: jspb.BinaryReader): RestoreVClusterResponse;
}

export namespace RestoreVClusterResponse {
    export type AsObject = {
        vcluster?: VCluster.AsObject,
        operationId: string,
    }
}

export class GetVClusterKubeconfigRequest extends jspb.Message {
    getName(): string;
    setName(value: string): GetVClusterKubeconfigRequest;
    getNamespace(): string;
    setNamespace(value: string): GetVClusterKubeconfigRequest;
    getFormat(): string;
    setFormat(value: string): GetVClusterKubeconfigRequest;
    getValidityHours(): number;
    setValidityHours(value: number): GetVClusterKubeconfigRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetVClusterKubeconfigRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetVClusterKubeconfigRequest): GetVClusterKubeconfigRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetVClusterKubeconfigRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetVClusterKubeconfigRequest;
    static deserializeBinaryFromReader(message: GetVClusterKubeconfigRequest, reader: jspb.BinaryReader): GetVClusterKubeconfigRequest;
}

export namespace GetVClusterKubeconfigRequest {
    export type AsObject = {
        name: string,
        namespace: string,
        format: string,
        validityHours: number,
    }
}

export class GetVClusterKubeconfigResponse extends jspb.Message {
    getKubeconfig(): string;
    setKubeconfig(value: string): GetVClusterKubeconfigResponse;
    getApiServerEndpoint(): string;
    setApiServerEndpoint(value: string): GetVClusterKubeconfigResponse;

    hasExpiresAt(): boolean;
    clearExpiresAt(): void;
    getExpiresAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setExpiresAt(value?: google_protobuf_timestamp_pb.Timestamp): GetVClusterKubeconfigResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetVClusterKubeconfigResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetVClusterKubeconfigResponse): GetVClusterKubeconfigResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetVClusterKubeconfigResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetVClusterKubeconfigResponse;
    static deserializeBinaryFromReader(message: GetVClusterKubeconfigResponse, reader: jspb.BinaryReader): GetVClusterKubeconfigResponse;
}

export namespace GetVClusterKubeconfigResponse {
    export type AsObject = {
        kubeconfig: string,
        apiServerEndpoint: string,
        expiresAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class WatchVClusterRequest extends jspb.Message {
    getName(): string;
    setName(value: string): WatchVClusterRequest;
    getNamespace(): string;
    setNamespace(value: string): WatchVClusterRequest;
    getLabelSelector(): string;
    setLabelSelector(value: string): WatchVClusterRequest;
    getResourceVersion(): string;
    setResourceVersion(value: string): WatchVClusterRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WatchVClusterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WatchVClusterRequest): WatchVClusterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WatchVClusterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WatchVClusterRequest;
    static deserializeBinaryFromReader(message: WatchVClusterRequest, reader: jspb.BinaryReader): WatchVClusterRequest;
}

export namespace WatchVClusterRequest {
    export type AsObject = {
        name: string,
        namespace: string,
        labelSelector: string,
        resourceVersion: string,
    }
}

export class WatchVClusterResponse extends jspb.Message {
    getType(): WatchEventType;
    setType(value: WatchEventType): WatchVClusterResponse;

    hasVcluster(): boolean;
    clearVcluster(): void;
    getVcluster(): VCluster | undefined;
    setVcluster(value?: VCluster): WatchVClusterResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WatchVClusterResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WatchVClusterResponse): WatchVClusterResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WatchVClusterResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WatchVClusterResponse;
    static deserializeBinaryFromReader(message: WatchVClusterResponse, reader: jspb.BinaryReader): WatchVClusterResponse;
}

export namespace WatchVClusterResponse {
    export type AsObject = {
        type: WatchEventType,
        vcluster?: VCluster.AsObject,
    }
}

export class ListSnapshotsRequest extends jspb.Message {
    getVclusterName(): string;
    setVclusterName(value: string): ListSnapshotsRequest;
    getNamespace(): string;
    setNamespace(value: string): ListSnapshotsRequest;
    getPageSize(): number;
    setPageSize(value: number): ListSnapshotsRequest;
    getPageToken(): string;
    setPageToken(value: string): ListSnapshotsRequest;
    getLabelSelector(): string;
    setLabelSelector(value: string): ListSnapshotsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListSnapshotsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListSnapshotsRequest): ListSnapshotsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListSnapshotsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListSnapshotsRequest;
    static deserializeBinaryFromReader(message: ListSnapshotsRequest, reader: jspb.BinaryReader): ListSnapshotsRequest;
}

export namespace ListSnapshotsRequest {
    export type AsObject = {
        vclusterName: string,
        namespace: string,
        pageSize: number,
        pageToken: string,
        labelSelector: string,
    }
}

export class ListSnapshotsResponse extends jspb.Message {
    clearSnapshotsList(): void;
    getSnapshotsList(): Array<Snapshot>;
    setSnapshotsList(value: Array<Snapshot>): ListSnapshotsResponse;
    addSnapshots(value?: Snapshot, index?: number): Snapshot;
    getNextPageToken(): string;
    setNextPageToken(value: string): ListSnapshotsResponse;
    getTotalCount(): number;
    setTotalCount(value: number): ListSnapshotsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListSnapshotsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListSnapshotsResponse): ListSnapshotsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListSnapshotsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListSnapshotsResponse;
    static deserializeBinaryFromReader(message: ListSnapshotsResponse, reader: jspb.BinaryReader): ListSnapshotsResponse;
}

export namespace ListSnapshotsResponse {
    export type AsObject = {
        snapshotsList: Array<Snapshot.AsObject>,
        nextPageToken: string,
        totalCount: number,
    }
}

export class GetSnapshotRequest extends jspb.Message {
    getId(): string;
    setId(value: string): GetSnapshotRequest;
    getName(): string;
    setName(value: string): GetSnapshotRequest;
    getNamespace(): string;
    setNamespace(value: string): GetSnapshotRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSnapshotRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetSnapshotRequest): GetSnapshotRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSnapshotRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSnapshotRequest;
    static deserializeBinaryFromReader(message: GetSnapshotRequest, reader: jspb.BinaryReader): GetSnapshotRequest;
}

export namespace GetSnapshotRequest {
    export type AsObject = {
        id: string,
        name: string,
        namespace: string,
    }
}

export class GetSnapshotResponse extends jspb.Message {

    hasSnapshot(): boolean;
    clearSnapshot(): void;
    getSnapshot(): Snapshot | undefined;
    setSnapshot(value?: Snapshot): GetSnapshotResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSnapshotResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetSnapshotResponse): GetSnapshotResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSnapshotResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSnapshotResponse;
    static deserializeBinaryFromReader(message: GetSnapshotResponse, reader: jspb.BinaryReader): GetSnapshotResponse;
}

export namespace GetSnapshotResponse {
    export type AsObject = {
        snapshot?: Snapshot.AsObject,
    }
}

export class DeleteSnapshotRequest extends jspb.Message {
    getId(): string;
    setId(value: string): DeleteSnapshotRequest;
    getForce(): boolean;
    setForce(value: boolean): DeleteSnapshotRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteSnapshotRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteSnapshotRequest): DeleteSnapshotRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteSnapshotRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteSnapshotRequest;
    static deserializeBinaryFromReader(message: DeleteSnapshotRequest, reader: jspb.BinaryReader): DeleteSnapshotRequest;
}

export namespace DeleteSnapshotRequest {
    export type AsObject = {
        id: string,
        force: boolean,
    }
}

export class DeleteSnapshotResponse extends jspb.Message {

    hasDeleteTime(): boolean;
    clearDeleteTime(): void;
    getDeleteTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setDeleteTime(value?: google_protobuf_timestamp_pb.Timestamp): DeleteSnapshotResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteSnapshotResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteSnapshotResponse): DeleteSnapshotResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteSnapshotResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteSnapshotResponse;
    static deserializeBinaryFromReader(message: DeleteSnapshotResponse, reader: jspb.BinaryReader): DeleteSnapshotResponse;
}

export namespace DeleteSnapshotResponse {
    export type AsObject = {
        deleteTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export enum Phase {
    PHASE_UNSPECIFIED = 0,
    PHASE_CREATING = 1,
    PHASE_RUNNING = 2,
    PHASE_SUSPENDED = 3,
    PHASE_SCALING = 4,
    PHASE_DELETING = 5,
    PHASE_ERROR = 6,
    PHASE_UPDATING = 7,
    PHASE_RESTORING = 8,
    PHASE_SNAPSHOTTING = 9,
    PHASE_RESUMING = 10,
    PHASE_PENDING = 11,
}

export enum SnapshotStatus {
    SNAPSHOT_STATUS_UNSPECIFIED = 0,
    SNAPSHOT_STATUS_CREATING = 1,
    SNAPSHOT_STATUS_READY = 2,
    SNAPSHOT_STATUS_FAILED = 3,
    SNAPSHOT_STATUS_DELETING = 4,
}

export enum WatchEventType {
    WATCH_EVENT_TYPE_UNSPECIFIED = 0,
    WATCH_EVENT_TYPE_ADDED = 1,
    WATCH_EVENT_TYPE_MODIFIED = 2,
    WATCH_EVENT_TYPE_DELETED = 3,
    WATCH_EVENT_TYPE_ERROR = 4,
}
