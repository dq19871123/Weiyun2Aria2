// ==UserScript==
// @name         Weiyun2Aria2
// @namespace    https://github.com/dq19871123/Weiyun2Aria2/
// @version      0.1.3
// @description  直接解析微云直链并推送到Aria2进行下载，支持单文件、视频免流直链与批量打包直推，内置腾讯190054频控自动绕过与单选精准识别机制
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwMjg0YzciLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzI1NjNlYiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzFkNGVkOCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzRhZGU4MCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzEwYjk4MSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJjIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzBmMTcyYSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzFlMjkzYiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiByeD0iMjgiIGZpbGw9InVybCgjYSkiLz48cGF0aCBkPSJNNjIgNjhoNDRjOS45IDAgMTgtOC4xIDE4LTE4IDAtOC45LTYuNS0xNi4zLTE1LjEtMTcuN0M4Ni43IDIxLjYgNzYuNSAxNCA2NCAxNGMtMTAuNCAwLTE5LjQgNi4xLTIzLjcgMTVDMzAuMyAzMC4yIDIzIDM4LjggMjMgNDljMCAxMC41IDguNSAxOSAxOSAxOXoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45NSIvPjxwYXRoIGQ9Ik01MCAzNHYxMk02NCAyNnYyME03OCAzNHYxMiIgc3Ryb2tlPSIjMDI4NGM3IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNNjQgODQgNDYgNThoMTFWNDRoMTR2MTRoMTFMNjQgODR6IiBmaWxsPSJ1cmwoI2IpIi8+PHJlY3QgeD0iMjYiIHk9IjkwIiB3aWR0aD0iNzYiIGhlaWdodD0iMjYiIHJ4PSI4IiBmaWxsPSJ1cmwoI2MpIiBzdHJva2U9IiMzOGJkZjgiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjY0IiB5PSIxMDMiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksLWFwcGxlLXN5c3RlbSxzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iOTAwIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMzhiZGY4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgbGV0dGVyLXNwYWNpbmc9IjEiPkFyaWEyPC90ZXh0Pjwvc3ZnPg==
// @author       dq19871123
// @updateURL    https://raw.githubusercontent.com/dq19871123/Weiyun2Aria2/main/Weiyun2Aria2.user.js
// @downloadURL  https://raw.githubusercontent.com/dq19871123/Weiyun2Aria2/main/Weiyun2Aria2.user.js
// @match        *://*.weiyun.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_log
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @run-at       document-end
// @connect      *
// ==/UserScript==

(function () {
	'use strict';

	// ==================== 1. 网页内嵌 Toast 弹窗通知 ====================
	function showToast({ title = '', text = '', type = 'info', timeout = 3500 }) {
		let container = document.getElementById('wy-toast-container');
		if (!container) {
			container = document.createElement('div');
			container.id = 'wy-toast-container';
			container.style.cssText = `
				position: fixed;
				top: 24px;
				right: 24px;
				z-index: 10000000;
				display: flex;
				flex-direction: column;
				gap: 10px;
				pointer-events: none;
				font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
			`;
			document.body.appendChild(container);
		}

		const borderColors = {
			success: '#10b981',
			error: '#ef4444',
			warning: '#f59e0b',
			info: '#3b82f6'
		};
		const borderColor = borderColors[type] || borderColors.info;

		const toast = document.createElement('div');
		toast.style.cssText = `
			pointer-events: auto;
			min-width: 280px;
			max-width: 440px;
			background: #ffffff;
			border-radius: 8px;
			box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08);
			border-left: 4px solid ${borderColor};
			padding: 12px 16px;
			color: #1e293b;
			display: flex;
			flex-direction: column;
			gap: 4px;
			opacity: 0;
			transform: translateX(30px);
			transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		`;

		if (title) {
			const titleElem = document.createElement('div');
			titleElem.style.cssText = 'font-weight: 600; font-size: 14px; line-height: 1.4; word-break: break-word;';
			titleElem.textContent = title;
			toast.appendChild(titleElem);
		}

		if (text) {
			const textElem = document.createElement('div');
			textElem.style.cssText = 'font-size: 12px; color: #64748b; line-height: 1.5; word-break: break-word;';
			textElem.textContent = text;
			toast.appendChild(textElem);
		}

		container.appendChild(toast);

		requestAnimationFrame(() => {
			toast.style.opacity = '1';
			toast.style.transform = 'translateX(0)';
		});

		setTimeout(() => {
			toast.style.opacity = '0';
			toast.style.transform = 'translateX(30px)';
			setTimeout(() => {
				if (toast.parentNode) {
					toast.parentNode.removeChild(toast);
				}
			}, 250);
		}, timeout);
	}

	// ==================== 2. 工具函数：文件大小格式化 ====================
	function formatSize(bytes) {
		if (!bytes || bytes <= 0) return '未知大小';
		const units = ['B', 'KB', 'MB', 'GB', 'TB'];
		let i = 0;
		let size = bytes;
		while (size >= 1024 && i < units.length - 1) {
			size /= 1024;
			i++;
		}
		return `${size.toFixed(2)} ${units[i]}`;
	}

	// ==================== 3. 配置存储与读取 ====================
	const DEFAULT_CONFIG = {
		rpcUrl: 'http://127.0.0.1:6800/jsonrpc',
		rpcSecret: '',
		threads: 10
	};

	function getConfig() {
		return {
			rpcUrl: (GM_getValue('wy_dir_rpc_url', DEFAULT_CONFIG.rpcUrl) || '').trim(),
			rpcSecret: (GM_getValue('wy_dir_rpc_secret', DEFAULT_CONFIG.rpcSecret) || '').trim(),
			threads: Math.max(parseInt(GM_getValue('wy_dir_threads', DEFAULT_CONFIG.threads), 10) || 1, 1)
		};
	}

	function saveConfig(cfg) {
		GM_setValue('wy_dir_rpc_url', (cfg.rpcUrl || '').trim());
		GM_setValue('wy_dir_rpc_secret', (cfg.rpcSecret || '').trim());
		GM_setValue('wy_dir_threads', Math.max(parseInt(cfg.threads, 10) || 1, 1));
	}

	if (typeof GM_registerMenuCommand !== 'undefined') {
		GM_registerMenuCommand('⚙️ 参数设置', showSettingsModal);
	}

	// ==================== 4. 可视化设置弹窗 ====================
	function showSettingsModal() {
		if (document.getElementById('wy-direct-settings-modal')) return;

		const current = getConfig();

		const modalHtml = `
		<div id="wy-direct-settings-modal" style="
			position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
			background: rgba(0, 0, 0, 0.45); z-index: 9999999;
			display: flex; align-items: center; justify-content: center;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		">
			<div style="
				background: #ffffff; width: 460px; border-radius: 12px;
				box-shadow: 0 20px 40px rgba(0,0,0,0.2); overflow: hidden;
				display: flex; flex-direction: column; animation: wyFadeIn 0.2s ease-out;
			">
				<div style="
					padding: 16px 20px; background: #f8fafc; border-bottom: 1px solid #e2e8f0;
					display: flex; justify-content: space-between; align-items: center;
				">
					<span style="font-size: 16px; font-weight: 600; color: #1e293b;">Aria2 直推配置</span>
					<span id="wy-modal-close" style="cursor: pointer; font-size: 18px; color: #64748b; font-weight: bold;">✕</span>
				</div>

				<div style="padding: 20px; display: flex; flex-direction: column; gap: 16px;">
					<div>
						<label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px;">
							Aria2 RPC 接口地址 (JSON-RPC)
						</label>
						<input id="wy-cfg-rpcurl" type="text" value="${current.rpcUrl}" placeholder="http://127.0.0.1:6800/jsonrpc" style="
							width: 100%; box-sizing: border-box; padding: 9px 12px; font-size: 13px;
							border: 1px solid #cbd5e1; border-radius: 6px; outline: none;
						" />
					</div>

					<div>
						<label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px;">
							Aria2 RPC Secret (密钥，无则留空)
						</label>
						<input id="wy-cfg-secret" type="password" value="${current.rpcSecret}" placeholder="RPC 密钥" style="
							width: 100%; box-sizing: border-box; padding: 9px 12px; font-size: 13px;
							border: 1px solid #cbd5e1; border-radius: 6px; outline: none;
						" />
					</div>

					<div>
						<label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px;">
							下载分段 / 连接数 (Split & Max-Connections)
						</label>
						<input id="wy-cfg-threads" type="number" min="1" value="${current.threads}" style="
							width: 100%; box-sizing: border-box; padding: 9px 12px; font-size: 13px;
							border: 1px solid #cbd5e1; border-radius: 6px; outline: none;
						" />
						<div style="font-size: 12px; color: #64748b; margin-top: 4px;">
							默认 10 线程。原版 Aria2 最大支持 16 线程。请避免设置过高以防触发腾讯防刷流控。
						</div>
					</div>
				</div>

				<div style="
					padding: 14px 20px; background: #f8fafc; border-top: 1px solid #e2e8f0;
					display: flex; justify-content: flex-end; gap: 10px;
				">
					<button id="wy-modal-cancel" style="
						padding: 7px 16px; font-size: 13px; font-weight: 500; border-radius: 6px;
						border: 1px solid #cbd5e1; background: #ffffff; color: #475569; cursor: pointer;
					">取消</button>
					<button id="wy-modal-save" style="
						padding: 7px 18px; font-size: 13px; font-weight: 500; border-radius: 6px;
						border: none; background: #2563eb; color: #ffffff; cursor: pointer;
					">保存设置</button>
				</div>
			</div>
		</div>
		<style>
			@keyframes wyFadeIn {
				from { opacity: 0; transform: translateY(-10px); }
				to { opacity: 1; transform: translateY(0); }
			}
			#wy-cfg-rpcurl:focus, #wy-cfg-secret:focus, #wy-cfg-threads:focus {
				border-color: #2563eb !important;
				box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
			}
		</style>
		`;

		const container = document.createElement('div');
		container.innerHTML = modalHtml;
		document.body.appendChild(container);

		const close = () => container.remove();
		document.getElementById('wy-modal-close').addEventListener('click', close);
		document.getElementById('wy-modal-cancel').addEventListener('click', close);
		document.getElementById('wy-modal-save').addEventListener('click', () => {
			const rpcUrl = document.getElementById('wy-cfg-rpcurl').value.trim();
			const rpcSecret = document.getElementById('wy-cfg-secret').value.trim();
			let threads = parseInt(document.getElementById('wy-cfg-threads').value, 10) || 1;
			threads = Math.max(threads, 1);

			if (!rpcUrl) {
				alert('Aria2 RPC 接口地址不能为空！');
				return;
			}

			saveConfig({ rpcUrl, rpcSecret, threads });
			close();

			showToast({
				title: '配置已更新',
				text: `Aria2: ${rpcUrl} (线程: ${threads})`,
				type: 'success',
				timeout: 3000
			});
		});
	}

	// ==================== 5. Aria2 RPC 推送 ====================
	function extractFileName(url, fallbackName) {
		let name = fallbackName && fallbackName.trim() ? fallbackName.trim() : '';
		if (!name) {
			try {
				const u = new URL(url);
				const fname = u.searchParams.get('fname');
				if (fname) name = decodeURIComponent(fname);
				else {
					const parts = u.pathname.split('/');
					name = decodeURIComponent(parts[parts.length - 1]);
				}
			} catch (_) {}
		}
		return name || `weiyun_download_${Date.now()}`;
	}

	function pushTaskToAria2(item, config, fallbackName) {
		const isPackage = item.isPackage || (item.url && item.url.includes('package_download'));
		const fileName = extractFileName(item.url, fallbackName || item.fileName);
		const cookieHeader = `${item.cookieName || 'FTN5K'}=${item.cookieValue || ''}`;
		const threadsStr = config.threads.toString();

		const options = {
			"out": fileName,
			"user-agent": navigator.userAgent,
			"referer": "https://www.weiyun.com/",
			"use-head": "false", // 跳过 HEAD 探测直接发 GET，防止微云 CDN 阻断
			"allow-overwrite": "true",
			"auto-file-renaming": "false",
			"header": [`Cookie: ${cookieHeader}`],
			"max-connection-per-server": threadsStr,
			"split": threadsStr,
			"connect-timeout": "30",
			"timeout": "60",
			"max-tries": "5"
		};

		const params = [];
		if (config.rpcSecret) {
			params.push(`token:${config.rpcSecret}`);
		}
		params.push([item.url]);
		params.push(options);

		const payload = {
			id: `WY_DIR_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
			jsonrpc: '2.0',
			method: 'aria2.addUri',
			params: params
		};

		return new Promise((resolve) => {
			GM_xmlhttpRequest({
				method: 'POST',
				url: config.rpcUrl,
				headers: { 'Content-Type': 'application/json' },
				data: JSON.stringify(payload),
				responseType: 'json',
				onload(res) {
					if (res.status === 200 && res.response && !res.response.error) {
						resolve({ success: true, fileName, gid: res.response.result, expectedSize: item.expectedSize, isPackage });
					} else {
						const err = (res.response && res.response.error && res.response.error.message) || `HTTP ${res.status}`;
						resolve({ success: false, fileName, error: err });
					}
				},
				onerror(_) {
					resolve({ success: false, fileName, error: '无法连接到 Aria2 RPC 接口' });
				}
			});
		});
	}

	// ==================== 6. 核心逻辑：精准节点提取与直链调度 ====================
	let savedWebpackRequire = null;
	let lastRightClickedNode = null;

	// 捕获最近一次右键点击的文件节点，确保右键单选时绝对精准
	document.addEventListener('contextmenu', (e) => {
		const itemEl = e.target.closest('.list-group-item, .figure-list-item');
		if (itemEl && itemEl.__vue__ && itemEl.__vue__.fileNode) {
			lastRightClickedNode = itemEl.__vue__.fileNode;
		} else {
			lastRightClickedNode = null;
		}
	}, true);

	// 获取选中的文件节点列表 (精准过滤，杜绝单选误判多选)
	function getSelectedFileNodes() {
		const seen = new Set();
		const result = [];

		// 策略 1 (最精准，官方同款)：通过 Vuex Store 的 curNode.getKidNodes() 过滤 isSelected()
		try {
			let store = null;
			if (savedWebpackRequire && savedWebpackRequire.c) {
				const storeMod = savedWebpackRequire.c['+zu9'] ||
					Object.values(savedWebpackRequire.c).find(m => m.exports && m.exports.default && m.exports.default.state && (m.exports.default.state.disk || m.exports.default.state.sharedir));
				if (storeMod) {
					store = storeMod.exports.default || storeMod.exports;
				}
			}
			if (!store) {
				const appEl = document.querySelector('#app') || document.querySelector('.layout-body') || document.body;
				store = appEl && appEl.__vue__ && appEl.__vue__.$store;
			}

			if (store && store.state) {
				const diskState = store.state.disk || store.state.safebox || store.state.sharedir;
				const curNode = diskState && diskState.curNode;
				if (curNode && typeof curNode.getKidNodes === 'function') {
					const kidNodes = curNode.getKidNodes() || [];
					const selectedKids = kidNodes.filter(node => node && typeof node.isSelected === 'function' && node.isSelected());
					if (selectedKids.length > 0) {
						return selectedKids;
					}
				}
			}
		} catch (e) {
			console.warn('[Weiyun2Aria2] 从 Vuex store 获取选中项异常:', e);
		}

		// 策略 2 (DOM 提取)：微云中所有条目均带静态类 "checked"，严禁使用 .checked 匹配！
		// 选中的条目必须包含 "act" 类：列表视图为 .list-group-item.act，图标视图为 .figure-list-item.act
		const actElements = document.querySelectorAll('.list-group-item.act, .figure-list-item.act');
		actElements.forEach(el => {
			const node = el.__vue__ && el.__vue__.fileNode;
			if (node && typeof node.getId === 'function') {
				const id = node.getId();
				// 必须通过 node.isSelected() 核验证实处于激活选中状态
				const isSelected = typeof node.isSelected === 'function' ? node.isSelected() : true;
				if (isSelected && !seen.has(id)) {
					seen.add(id);
					result.push(node);
				}
			}
		});

		return result;
	}

	// 从 Webpack 模块缓存动态发现 ucNY 下载模块 (包含 getSingleUrl, getPackUrl)
	function getDownloadModule() {
		if (!savedWebpackRequire || !savedWebpackRequire.c) return null;
		const c = savedWebpackRequire.c;
		if (c['ucNY'] && c['ucNY'].exports) {
			return c['ucNY'].exports.default || c['ucNY'].exports;
		}
		for (let k in c) {
			const mod = c[k];
			if (mod && mod.exports) {
				const exp = mod.exports.default || mod.exports;
				if (exp && typeof exp.getSingleUrl === 'function' && typeof exp.getPackUrl === 'function') {
					return exp;
				}
			}
		}
		return null;
	}

	// 从 Webpack 模块缓存发现 diskService
	function getDiskService() {
		if (!savedWebpackRequire || !savedWebpackRequire.c) return null;
		const diskServices = Object.values(savedWebpackRequire.c)
			.filter(x => x.exports && typeof x.exports.namespace === 'function' && typeof x.exports.namespace('PERSON').fetchUserInfo === 'function')
			.map(x => x.exports.namespace);
		return diskServices && diskServices[0] && diskServices[0]('PERSON');
	}

	// 视频免流直链提取通道 (100% 避开 DiskFileBatchDownload 频控)
	async function getVideoDownloadInfo(fileNode) {
		const videoId = fileNode.getId();
		const dirKey = fileNode.getPdirKey();
		const ppdirKey = fileNode.getPPdirKey ? fileNode.getPPdirKey() : '';
		let url = `https://www.weiyun.com/video_preview?videoID=${encodeURIComponent(videoId)}&dirKey=${encodeURIComponent(dirKey)}`;
		if (ppdirKey) {
			url += `&pdirKey=${encodeURIComponent(ppdirKey)}`;
		}

		const res = await fetch(url, { credentials: 'include' });
		const html = await res.text();
		const m = html.match(/window\.syncData\s*=\s*(\{.+?\});\s*<\/script>/);
		if (m && m[1]) {
			try {
				const data = JSON.parse(m[1]);
				const playInfo = data && data.cloudPlayInfo && data.cloudPlayInfo.origin_video_play_info;
				if (playInfo && (playInfo.https_download_url || playInfo.download_url)) {
					const nodeSize = typeof fileNode.getSize === 'function' ? fileNode.getSize() : (playInfo.file_size || 0);
					return {
						url: playInfo.https_download_url || playInfo.download_url,
						cookieName: playInfo.cookie_name || 'FTN5K',
						cookieValue: playInfo.cookie_value || '',
						fileName: fileNode.getName ? fileNode.getName() : (playInfo.file_name || ''),
						expectedSize: nodeSize,
						isPackage: false
					};
				}
			} catch (e) {
				console.error('[Weiyun2Aria2] 解析 video_preview syncData 失败:', e);
			}
		}
		return null;
	}

	// 单文件直链获取 (集成 190054 自动打包绕过与大小识别)
	async function getFileDownloadInfo(fileNode, downloadModule, diskService) {
		let lastError = null;
		const nodeSize = typeof fileNode.getSize === 'function' ? fileNode.getSize() : 0;

		// 1. 优先调用微云原生 getSingleUrl 模块 (cmd 2402，带 Content-Length 直链)
		if (downloadModule && typeof downloadModule.getSingleUrl === 'function') {
			try {
				const info = await downloadModule.getSingleUrl(fileNode);
				if (info && (info.https_download_url || info.download_url)) {
					return {
						url: info.https_download_url || info.download_url,
						cookieName: info.cookie_name || 'FTN5K',
						cookieValue: info.cookie_value || '',
						fileName: fileNode.getName ? fileNode.getName() : (info.file_name || ''),
						expectedSize: nodeSize,
						isPackage: false
					};
				}
			} catch (err) {
				lastError = err;
			}
		} else if (diskService && typeof diskService.fetchDownloadFileInfo === 'function') {
			// 兜底方案：使用 diskService.fetchDownloadFileInfo
			try {
				const res = await diskService.fetchDownloadFileInfo({ fileNodes: [fileNode] });
				const info = (res && res.file_list && res.file_list[0]) || res;
				if (info && (info.https_download_url || info.download_url)) {
					return {
						url: info.https_download_url || info.download_url,
						cookieName: info.cookie_name || 'FTN5K',
						cookieValue: info.cookie_value || '',
						fileName: fileNode.getName ? fileNode.getName() : (info.file_name || ''),
						expectedSize: nodeSize,
						isPackage: false
					};
				}
			} catch (err) {
				lastError = err;
			}
		}

		const ret = lastError && (lastError.ret || (lastError.data && lastError.data.rsp_header && lastError.data.rsp_header.retcode));
		const msg = lastError && (lastError.msg || (lastError.data && lastError.data.rsp_header && lastError.data.rsp_header.retmsg) || lastError.message);

		// 关键容灾策略：如果遇到 190054 (请求次数超限/频控)，自动降级切换打包通道 (cmd 2403) 绕过单文件风控
		if (ret === 190054 || ret === '190054' || (msg && msg.includes('超限'))) {
			showToast({
				title: '单文件接口频控 (190054)',
				text: '微云限制单文件下载，正在自动尝试打包通道 (cmd 2403) 绕过限制...',
				type: 'warning',
				timeout: 4000
			});

			if (downloadModule && typeof downloadModule.getPackUrl === 'function') {
				try {
					const packInfo = await downloadModule.getPackUrl([fileNode]);
					if (packInfo && (packInfo.https_download_url || packInfo.download_url)) {
						return {
							url: packInfo.https_download_url || packInfo.download_url,
							cookieName: packInfo.cookie_name || 'FTN5K',
							cookieValue: packInfo.cookie_value || '',
							fileName: packInfo.zip_filename ? decodeURIComponent(packInfo.zip_filename) : `${fileNode.getName ? fileNode.getName() : 'file'}.zip`,
							expectedSize: nodeSize,
							isPackage: true
						};
					}
				} catch (packErr) {
					console.error('[Weiyun2Aria2] 打包绕过通道亦失败:', packErr);
				}
			}

			throw new Error('微云单文件接口触发临时频控限制 (190054)。请等待 15~30 分钟冷却或更换网络/IP后再试。');
		}

		throw new Error(msg || '未能提取到有效直链，请稍后重试');
	}

	// 直推主入口
	async function downloadDirectly(preferredNode) {
		let fileNodes = [];

		// 若指定了目标节点（例如右键菜单触发）
		if (preferredNode && typeof preferredNode.getId === 'function') {
			const currentSelected = getSelectedFileNodes();
			// 如果当前是多选，且右键的目标恰好在多选列表中，则执行多选批量下载；否则判定为针对该节点的独立单选
			if (currentSelected.length > 1 && currentSelected.some(n => n.getId() === preferredNode.getId())) {
				fileNodes = currentSelected;
			} else {
				fileNodes = [preferredNode];
			}
		} else {
			fileNodes = getSelectedFileNodes();
		}

		if (!fileNodes || fileNodes.length === 0) {
			showToast({ title: '提示', text: '请先勾选需要下载的文件或文件夹', type: 'warning' });
			return;
		}

		const config = getConfig();
		if (!config.rpcUrl) {
			alert('请先配置 Aria2 RPC 接口！');
			showSettingsModal();
			return;
		}

		const downloadModule = getDownloadModule();
		const diskService = getDiskService();

		// 多文件或包含文件夹：打包下载通道 (cmd 2403)
		if (fileNodes.length > 1 || fileNodes.some(n => n.isDir && n.isDir())) {
			let totalSize = 0;
			fileNodes.forEach(f => {
				if (typeof f.getSize === 'function') totalSize += f.getSize();
			});
			const sizeDesc = totalSize > 0 ? ` (源文件约 ${formatSize(totalSize)})` : '';

			showToast({
				title: '批量打包',
				text: `正在为选中的 ${fileNodes.length} 项请求微云打包直链${sizeDesc}...`,
				type: 'info',
				timeout: 3000
			});

			try {
				if (!downloadModule) throw new Error('未检测到微云下载组件，请稍后刷新重试');
				const packInfo = await downloadModule.getPackUrl(fileNodes);
				if (!packInfo || (!packInfo.https_download_url && !packInfo.download_url)) {
					throw new Error('未获取到有效打包直链');
				}
				const directUrl = packInfo.https_download_url || packInfo.download_url;
				const packName = packInfo.zip_filename ? decodeURIComponent(packInfo.zip_filename) : `weiyun_pack_${Date.now()}.zip`;

				showToast({
					title: '打包就绪',
					text: `正在推送到 Aria2: ${packName}`,
					type: 'info',
					timeout: 3000
				});

				const res = await pushTaskToAria2({
					url: directUrl,
					cookieName: packInfo.cookie_name || 'FTN5K',
					cookieValue: packInfo.cookie_value || '',
					fileName: packName,
					expectedSize: totalSize,
					isPackage: true
				}, config, packName);

				if (res.success) {
					showToast({
						title: '推送成功 (打包通道)',
						text: `已提交到 Aria2: ${res.fileName}${sizeDesc}`,
						type: 'success',
						timeout: 4500
					});
				} else {
					showToast({
						title: 'Aria2 接收失败',
						text: res.error,
						type: 'error',
						timeout: 5000
					});
				}
			} catch (err) {
				console.error('[Weiyun2Aria2] 打包下载失败:', err);
				const msg = (err && (err.msg || err.message)) || '未知错误';
				showToast({
					title: '打包下载失败',
					text: msg,
					type: 'error',
					timeout: 5000
				});
			}
			return;
		}

		// 单文件下载
		const fileNode = fileNodes[0];
		const fileName = fileNode.getName ? fileNode.getName() : 'weiyun_file';

		// 1. 若为视频文件：优先采用 video_preview 解析高清免流直链 (100% 避开 190054 频控，带 Content-Length)
		const isVideo = (fileNode.isVideo && fileNode.isVideo()) || /\.(mp4|mkv|avi|flv|rmvb|mov|wmv|webm|ts|m4v|3gp)$/i.test(fileName);
		if (isVideo) {
			showToast({
				title: '解析中',
				text: `检测到视频文件，正在提取直链: ${fileName}`,
				type: 'info',
				timeout: 3000
			});

			try {
				const videoInfo = await getVideoDownloadInfo(fileNode);
				if (videoInfo && videoInfo.url) {
					const res = await pushTaskToAria2(videoInfo, config, fileName);
					if (res.success) {
						showToast({
							title: '推送成功 (视频通道)',
							text: `已提交到 Aria2: ${res.fileName}`,
							type: 'success',
							timeout: 4000
						});
						return;
					} else {
						showToast({
							title: 'Aria2 推送失败',
							text: res.error,
							type: 'error',
							timeout: 5000
						});
						return;
					}
				}
			} catch (e) {
				console.warn('[Weiyun2Aria2] 视频直链提取异常，降级到常规下载通道:', e);
			}
		}

		// 2. 常规单文件直链解析
		showToast({
			title: '解析中',
			text: `正在获取单文件直链: ${fileName}`,
			type: 'info',
			timeout: 3000
		});

		try {
			const itemInfo = await getFileDownloadInfo(fileNode, downloadModule, diskService);
			const res = await pushTaskToAria2(itemInfo, config, fileName);
			if (res.success) {
				const channelDesc = itemInfo.isPackage ? ' (打包通道绕过)' : ' (原生单文件直链)';
				const sizeHint = itemInfo.isPackage && itemInfo.expectedSize > 0 ? ` (源文件约 ${formatSize(itemInfo.expectedSize)})` : '';
				showToast({
					title: `推送成功${channelDesc}`,
					text: `已提交到 Aria2: ${res.fileName}${sizeHint}`,
					type: 'success',
					timeout: 4500
				});
			} else {
				showToast({
					title: 'Aria2 推送失败',
					text: res.error,
					type: 'error',
					timeout: 5000
				});
			}
		} catch (err) {
			console.error('[Weiyun2Aria2] 单文件直链获取失败:', err);
			const msg = (err && (err.msg || err.message)) || '直链解析异常';
			showToast({
				title: '获取直链失败',
				text: msg,
				type: 'error',
				timeout: 7000
			});
		}
	}

	// ==================== 7. DOM 注入与事件绑定 ====================
	function initDirectDownloadUI() {
		const observeCallback = function (mutations) {
			for (let mutation of mutations) {
				// 右键菜单注入
				if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
					mutation.addedNodes.forEach(node => {
						if (node.className && node.className.indexOf('mod-bubble-context-menu') > -1 && node.__vue__ && node.__vue__.items && node.__vue__.items.some(e => e.method === 'download')) {
							if (node.querySelector('.wy-aria-context-item')) return;
							const contextItems = node.querySelectorAll('.menu-item');
							if (contextItems.length === 0) return;

							const newContextItem = document.createElement('li');
							newContextItem.className = 'menu-item wy-aria-context-item';
							newContextItem.innerHTML = '<span class="txt">直推 Aria2</span>';
							newContextItem.addEventListener('click', () => {
								downloadDirectly(lastRightClickedNode);
								document.dispatchEvent(new Event('mousedown'));
							});
							contextItems[0].parentNode.insertBefore(newContextItem, contextItems[0].nextSibling);
						}
					});
				}

				// 顶部操作栏注入
				if (
					mutation.type === 'attributes' &&
					mutation.attributeName === 'style' &&
					mutation.target.className &&
					mutation.target.className.indexOf('mod-action-wrap-menu') > -1 &&
					mutation.target.style.display !== 'none' &&
					mutation.target.querySelectorAll('#action-item-aria-direct').length === 0
				) {
					const actionItems = mutation.target.querySelectorAll('.action-item');
					if (actionItems.length === 0) return;

					const directBtn = document.createElement('div');
					directBtn.id = 'action-item-aria-direct';
					directBtn.className = 'action-item';
					directBtn.innerHTML = '<div class="action-item-con"><i class="icon icon-download"></i><span class="act-txt">直推 Aria2</span></div>';
					directBtn.addEventListener('click', () => downloadDirectly(null));

					mutation.target.insertBefore(directBtn, actionItems[0].nextSibling);
				}
			}
		};

		new MutationObserver(observeCallback).observe(document.body, { attributes: true, childList: true, subtree: true });
	}

	// ==================== 8. Webpack 挂载注入 ====================
	const injectChunkId = Math.random().toString(36).substring(7);

	if (location.host === 'www.weiyun.com' && typeof webpackJsonp === 'function') {
		webpackJsonp([7891], {
			[injectChunkId]: function (modules, exports, require) {
				savedWebpackRequire = require;
				initDirectDownloadUI();
			}
		}, [injectChunkId]);
	} else {
		initDirectDownloadUI();
	}
})();
