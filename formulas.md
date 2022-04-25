## Variables

$F_t$ [N] – traction force

$F_i$ [N] – inertial force

$F_s$ [N] – road slope force

$F_r$ [N] – road load force

$F_a$ [N] – aerodynamic drag force

$F_w$ [N] - wheel force

$T_e$ [Nm] – engine torque

$T_w$ [Nm] – wheel torque (equal with transmission torque)

$a_v$ [m/s²] – vehicle acceleration

$g$ [m/s²] – gravitational acceleration

$α_s$ [rad] – road slope angle

$m_v$ [kg] - total vehicle mass

$m_{cb}$ [kg] - vehicle mass

$m_d$ [kg] - driver mass

$m_f$ [kg] - fuel mass

$r_{wd}$ [m] – dynamic wheel radius

$r_{ws}$ [m] – wheel radius

$i_x$ [-] – transmission gear ratio

$i_0$ [-] – final drive ratio

$η_d$ [-] – driveline efficiency

$c_r$ [-] – road load coefficient

$c_d$ [-] – air drag coefficient

$μ$ [-] – friction coefficient

$c_l$ [-] – rear axle load coefficient

$ρ$ [kg/m3] – air density at 20 °C

$A$ [m²] – vehicle frontal area

$v$ [m/s] – vehicle speed

$P_e$ [HP] – static engine power at full load

$N_e$ [rpm] – engine speed

$ω_t$ [rad/s] – transmission speed (equal with the wheel speed)

$\omega_w$ [rad/s] - wheel speed

---

## Formulas

### Forces total

$$F_t = F_i + F_s + F_r + F_a$$

### Inertial force

$$F_i = m_v \cdot a_v$$

### Road slope

$$F_s = m_v \cdot g \cdot sin(\alpha_s)$$

### Traction force

$$F_t = \frac{T_e \cdot i_x \cdot i_0 \cdot \eta_d}{r_{wd}} $$

### Friction force

$$F_f = m_v \cdot g \cdot \mu \cdot c_l$$

### Road load force

$$F_r = m_v \cdot g \cdot c_r \cdot cos(\alpha_s)$$

### Wheel traction force

$$F_w = \frac{T_w}{r_{wd}}$$

### Air drag

$$F_a = \frac{1}{2} \cdot \rho \cdot c_d \cdot A \cdot v^2$$

### Vehicle weight

$$m_v = f_{cb} + m_d + m_f$$

### Dynamic wheel radius

$$r_{wd} = 0.98 \cdot r_{ws}$$

### Acceleration rearranging

$$a_v = \frac{1}{m_v} \left [ F_t – \left (F_s + F_r + F_a \right ) \right ]$$

### Speed

$$v = \frac{1}{m_v} \int \left [ F_t – \left (F_s + F_r + F_a \right ) \right ] dt$$

### Wheel speed

$$\omega_w = \frac{v}{r_{wd}}$$

### Static engine power

$$P_e = \frac{1.36}{1000} \cdot \frac{\pi}{30} \cdot N_e \cdot T_e$$

### Transmission torque

$$T_t = i_x \cdot i_0 \cdot T_e \cdot \eta_d$$

### Transmission rpm

$$N_e = \frac{30}{\pi} \cdot \omega_t \cdot i_x \cdot i_0$$
