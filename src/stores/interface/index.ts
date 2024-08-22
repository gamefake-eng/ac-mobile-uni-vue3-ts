/* GlobalState */
export interface GlobalState {
	token: string;
	userInfo: any;
	language: string;
	themeConfig: ThemeConfigProps;
}

/* themeConfigProp */
export interface ThemeConfigProps {
	primary: string;
	isDark: boolean;
}

/* SocketState */
export interface SocketState {
	socketData: {
		[key: string]: {
			socket: WebSocket | null; // WebSocket对象
			isConnected: boolean; // 是否已链接
			message: any; // 接收消息
			pant: any; // 心跳定时器
			pantNum: number; // 心跳次数
			handlerMsgCb?: (key: string, data: any) => void; // 接收消息回调
		};
	};
}

/* tabsMenuProps */
export interface TabsMenuProps {
	icon: string;
	title: string;
	path: string;
	name: string;
	close: boolean;
}

/* TabsState */
export interface TabsState {
	tabsMenuList: TabsMenuProps[];
}
