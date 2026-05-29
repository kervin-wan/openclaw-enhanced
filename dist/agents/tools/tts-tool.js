import { Type } from "@sinclair/typebox";
import { loadConfig } from "../../config/config.js";
import { textToSpeech } from "../../tts/tts.js";
import { readStringParam } from "./common.js";
// Common Edge TTS voices for different languages
const VOICE_EXAMPLES = [
    // Chinese
    "zh-CN-XiaoxiaoNeural (Chinese female)",
    "zh-CN-YunxiNeural (Chinese male)",
    // English
    "en-US-JennyNeural (English female)",
    "en-US-GuyNeural (English male)",
    // Japanese
    "ja-JP-NanamiNeural (Japanese female)",
    // Korean
    "ko-KR-SunHiNeural (Korean female)",
].join(", ");
const TtsToolSchema = Type.Object({
    text: Type.String({ description: "Text to convert to speech." }),
    voice: Type.Optional(Type.String({
        description: `Edge TTS voice name. Choose based on text language. Examples: ${VOICE_EXAMPLES}. Format: {lang}-{region}-{name}Neural`,
    })),
    lang: Type.Optional(Type.String({
        description: "Language code matching the voice (e.g. zh-CN, en-US, ja-JP). Should match voice language.",
    })),
    channel: Type.Optional(Type.String({ description: "Optional channel id to pick output format (e.g. telegram)." })),
});
export function createTtsTool(opts) {
    return {
        label: "TTS",
        name: "tts",
        description: "Convert text to speech. IMPORTANT: Choose voice based on text language (e.g. zh-CN-XiaoxiaoNeural for Chinese, en-US-JennyNeural for English). Mismatched voice/text produces empty audio.",
        parameters: TtsToolSchema,
        execute: async (_toolCallId, args) => {
            const params = args;
            const text = readStringParam(params, "text", { required: true });
            const voice = readStringParam(params, "voice");
            const lang = readStringParam(params, "lang");
            const channel = readStringParam(params, "channel");
            const cfg = opts?.config ?? loadConfig();
            // Build overrides for edge TTS
            const overrides = voice || lang ? { edge: { voice, lang } } : undefined;
            const result = await textToSpeech({
                text,
                cfg,
                channel: channel ?? opts?.agentChannel,
                overrides,
            });
            if (result.success && result.audioPath) {
                const lines = [];
                // Tag Telegram Opus output as a voice bubble instead of a file attachment.
                if (result.voiceCompatible)
                    lines.push("[[audio_as_voice]]");
                lines.push(`MEDIA:${result.audioPath}`);
                return {
                    content: [{ type: "text", text: lines.join("\n") }],
                    details: { audioPath: result.audioPath, provider: result.provider },
                };
            }
            return {
                content: [
                    {
                        type: "text",
                        text: result.error ?? "TTS conversion failed",
                    },
                ],
                details: { error: result.error },
            };
        },
    };
}
