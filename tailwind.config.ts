import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				casino: {
					highlight: '#0EA5E9',
					dark: '#1A1F2C',
					light: '#F6F6F7',
					accent: '#8B5CF6',
					muted: '#8A898C',
					card: '#222233',
					neon: '#00FFFF',
					pink: '#F97316', 
					purple: '#8B5CF6',
					blue: '#0EA5E9',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
				'fade-in-up': {
					"0%": {
						opacity: "0",
						transform: "translateY(20px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
				'fade-out': {
					"0%": {
						opacity: "1",
						transform: "translateY(0)"
					},
					"100%": {
						opacity: "0",
						transform: "translateY(10px)"
					}
				},
				'scale-in': {
					"0%": {
						transform: "scale(0.95)",
						opacity: "0"
					},
					"100%": {
						transform: "scale(1)",
						opacity: "1"
					}
				},
				'scale-out': {
					from: { transform: "scale(1)", opacity: "1" },
					to: { transform: "scale(0.95)", opacity: "0" }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-500px 0' },
					'100%': { backgroundPosition: '500px 0' },
				},
				'bounce-slow': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
				'spin-once': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				'slide-down': {
					'0%': { opacity: '0', transform: 'translateY(-10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'neon-pulse': {
					'0%, 100%': { 
						textShadow: '0 0 10px #0EA5E9, 0 0 20px #0EA5E9, 0 0 30px #0EA5E9' 
					},
					'50%': { 
						textShadow: '0 0 5px #0EA5E9, 0 0 10px #0EA5E9, 0 0 15px #0EA5E9' 
					}
				},
				'glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px #00FFFF, 0 0 15px #00FFFF' 
					},
					'50%': { 
						boxShadow: '0 0 15px #00FFFF, 0 0 25px #00FFFF' 
					}
				},
				'flicker': {
					'0%, 100%': { opacity: '1' },
					'25%': { opacity: '0.9' },
					'32%': { opacity: '0.95' },
					'50%': { opacity: '0.85' },
					'72%': { opacity: '0.9' },
					'80%': { opacity: '1' },
					'92%': { opacity: '0.9' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-in-up': 'fade-in-up 0.7s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
				'shimmer': 'shimmer 2s infinite linear',
				'bounce-slow': 'bounce-slow 3s infinite ease-in-out',
				'spin-once': 'spin-once 0.5s ease-out',
				'slide-down': 'slide-down 0.3s ease-out',
				'neon-pulse': 'neon-pulse 2s infinite',
				'glow': 'glow 2s infinite',
				'flicker': 'flicker 3s infinite linear',
			},
			backgroundImage: {
				'cyberpunk-grid': 'linear-gradient(rgba(33, 39, 55, 0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(33, 39, 55, 0.7) 1px, transparent 1px)',
				'cyberpunk-gradient': 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
				'neon-grid': 'radial-gradient(#0EA5E9 1px, transparent 1px)',
			},
			scale: {
				'102': '1.02',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
